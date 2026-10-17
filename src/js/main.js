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
let erroDeConexaoVisivel = false;

function exibirPeso(mensagem) {
  valorPeso.textContent = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(mensagem.weight);
  mensagemErro.hidden = true;
  erroDeConexaoVisivel = false;
}

function exibirErro(erro) {
  if (!erroDeConexaoVisivel) {
    console.error('Não foi possível consultar o peso.', erro);
    mensagemErro.hidden = false;
    erroDeConexaoVisivel = true;
  }
}

const pararMonitoramento = pesoService.monitorarPeso(exibirPeso, exibirErro);
window.addEventListener('pagehide', pararMonitoramento, { once: true });
