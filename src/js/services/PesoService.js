export class PesoService {
  constructor(clienteESP32, pesoRepository) {
    this.clienteESP32 = clienteESP32;
    this.pesoRepository = pesoRepository;
  }

  async obterPeso() {
    const mensagem = await this.clienteESP32.receberPeso();
    await this.pesoRepository.salvar(mensagem.weight, new Date().toISOString());

    return mensagem;
  }

  monitorarPeso(onMensagem, onErro = () => {}, intervaloMs = 1000) {
    let ultimaLeitura;

    return this.clienteESP32.monitorarPeso(
      async (mensagem) => {
        const leituraRepetida = ultimaLeitura
          && ultimaLeitura.deviceId === mensagem.deviceId
          && ultimaLeitura.weight === mensagem.weight;

        if (leituraRepetida) return;

        await this.pesoRepository.salvar(
          mensagem.weight,
          new Date().toISOString(),
        );
        ultimaLeitura = {
          deviceId: mensagem.deviceId,
          weight: mensagem.weight,
        };
        onMensagem(mensagem);
      },
      onErro,
      intervaloMs,
    );
  }

  async listarPesos() {
    return this.pesoRepository.listar();
  }
}
