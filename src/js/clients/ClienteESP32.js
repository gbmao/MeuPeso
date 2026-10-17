import { Capacitor, CapacitorHttp } from '@capacitor/core';

export class ClienteESP32 {
  constructor(endereco) {
    this.endereco = endereco.replace(/\/$/, '');
  }

  async receberPeso(signal) {
    const opcoes = {
      url: `${this.endereco}/weight`,
      connectTimeout: 5000,
      readTimeout: 5000,
      responseType: 'json',
    };

    if (signal && !Capacitor.isNativePlatform()) {
      opcoes.webFetchExtra = { signal };
    }

    const resposta = await CapacitorHttp.get(opcoes);

    if (resposta.status < 200 || resposta.status >= 300) {
      throw new Error(`Erro ao consultar a balança: HTTP ${resposta.status}`);
    }

    return resposta.data;
  }

  monitorarPeso(aoReceberPeso, aoErro = () => {}, intervaloMs = 1000) {
    let ativo = true;
    let timer = null;
    let controller = null;

    const consultar = async () => {
      if (!ativo) return;

      controller = new AbortController();

      try {
        const mensagem = await this.receberPeso(controller.signal);
        if (ativo) {
          await aoReceberPeso(mensagem);
        }
      } catch (erro) {
        if (ativo && erro.name !== 'AbortError') {
          aoErro(erro);
        }
      } finally {
        controller = null;

        if (ativo) {
          timer = setTimeout(consultar, intervaloMs);
        }
      }
    };

    void consultar();

    return () => {
      ativo = false;
      clearTimeout(timer);
      controller?.abort();
    };
  }
}
