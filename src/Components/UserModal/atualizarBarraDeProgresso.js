export function atualizarBarraDeProgresso(dataAbertura, dataVencimento) {
  const dataAtual = new Date();
  const totalMilissegundos = new Date(dataVencimento) - new Date(dataAbertura);
  const milissegundosDecorridos = dataAtual - new Date(dataAbertura);
  const progresso = (milissegundosDecorridos / totalMilissegundos) * 100;

  // Defina as cores da barra de progresso com base na porcentagem
  let cor;
  if (progresso >= 0 && progresso <= 25) {
    cor = '#1e8000';
  } else if (progresso > 25 && progresso <= 50) {
    cor = '#6d8000';
  } else if (progresso > 50 && progresso <= 75) {
    cor = '#805300';
  } else if (progresso > 75 && progresso <= 90) {
    cor = '#801300';
  } else {
    cor = 'red';
  }

  // Atualize a largura e a cor da barra de progresso
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    progressBar.style.width = `${progresso}%`;
    progressBar.style.backgroundColor = cor;
  }
}