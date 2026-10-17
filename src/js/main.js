import { SplashScreen } from '@capacitor/splash-screen';
import { enderecoESP32 } from './config.js';
import { ClienteESP32 } from './clients/ClienteESP32.js';
import { PesoService } from './services/PesoService.js';
import { PesoRepository } from './repositories/PesoRepository.js';

SplashScreen.hide();

const pesoService = new PesoService(
  new ClienteESP32(enderecoESP32),
  new PesoRepository(),
);

const valorPeso = document.querySelector('#valor-peso');
const mensagemErro = document.querySelector('#mensagem-erro');

async function carregarPeso() {
  try {
    const mensagem = await pesoService.obterPeso();
    valorPeso.textContent = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(mensagem.weight);
  } catch (erro) {
    console.error('Não foi possível carregar o peso.', erro);
    mensagemErro.hidden = false;
  }
}

carregarPeso();
