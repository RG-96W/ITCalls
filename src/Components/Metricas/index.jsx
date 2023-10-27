import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import './style.css';

const Metricas = () => {
  const [chamadosVencidos, setChamadosVencidos] = useState([]);
  const [chamadosNaoVencidos, setNaoChamadosVencidos] = useState([]);

  const [todosChamados, setTodosChamados] = useState([]);
  const [FCRCalculado, setFCRCalculado] = useState(0);

  const [tecnicosR, setTecnicosR] = useState(0);
  const [chamadosQnt, setChamadosQnt] = useState([]);

  const [TempoPorcentagem, setTempoPorcentagem] = useState(0);

  
  useEffect(() => {
    const hoje = new Date();
    const primeiroDiaDoMês = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    const ultimoDiaDoMês = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);

    // Fazer uma solicitação HTTP GET para obter os detalhes dos chamados
    fetch('http://200.216.165.199:51000/requests')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao obter os detalhes dos chamados');
        }
        return response.json();
      })
      .then((data) => {
        let totalFCR = 0;
        const todosChamados = data;
        setTodosChamados(todosChamados);

        const chamadoFCR = todosChamados.filter((chamado) => {
          const fcr = parseFloat(chamado.FCR);
          return !isNaN(fcr) && fcr > 0 &&             
          new Date(chamado.data_abertura) >= primeiroDiaDoMês &&
          new Date(chamado.data_abertura) <= ultimoDiaDoMês;
        });

        chamadoFCR.forEach((chamado) => {
          const fcr = parseFloat(chamado.FCR);
          totalFCR += fcr;
        });
        const FCRCalculado = (totalFCR / todosChamados.length)*100;

        const chamadosFechadosVencidos = data.filter((chamado) => {
          return (
            chamado.status === 'Fechado' &&
            new Date(chamado.data_fechamento) > new Date(chamado.data_previsao) &&
            new Date(chamado.data_abertura) >= primeiroDiaDoMês &&
            new Date(chamado.data_abertura) <= ultimoDiaDoMês
          );
        });

        const chamadosNaoVencidos = data.filter((chamado) => {
          return (
            chamado.status === 'Fechado' &&
            new Date(chamado.data_fechamento) < new Date(chamado.data_previsao) &&
            new Date(chamado.data_abertura) >= primeiroDiaDoMês &&
            new Date(chamado.data_abertura) <= ultimoDiaDoMês
          );
        });

        const chamadosPorTecnico = data.filter((chamado) => {
          return (
            chamado.status === 'Fechado'
          );
        });

        const tecnicoChamadosCount = {};

        chamadosPorTecnico.forEach((chamado) => {
          const tecnico = chamado.responsavel;
        
          // Se o técnico ainda não estiver na contagem, inicialize com 1; caso contrário, adicione 1 ao contador existente.
          tecnicoChamadosCount[tecnico] = (tecnicoChamadosCount[tecnico] || 0) + 1;
        });
        
        // Agora, você tem um objeto tecnicoChamadosCount que mapeia técnicos para o número de chamados atendidos por eles.
        
        // Para separar os nomes dos técnicos e as quantidades em duas constantes:
        const nomesTecnicos = Object.keys(tecnicoChamadosCount);
        const quantidadesChamados = Object.values(tecnicoChamadosCount);

        const chamadosFechados = data.filter((chamado) => {
          return(
            chamado.status === 'Fechado'
          )
        })

        const chamadosComPorcentagemTempoAtendimento = chamadosFechados.map((chamado) => {
          const dataAbertura = new Date(chamado.data_abertura);
          const dataFechamento = new Date(chamado.data_fechamento);
          const dataPrazo = new Date(chamado.data_previsao);
        
          const tempoTotal = dataPrazo - dataAbertura;
          const tempoAtendimento = dataFechamento - dataAbertura;
        
          const porcentagemTempoAtendimento = (tempoTotal / tempoAtendimento) * 100;
        
          return porcentagemTempoAtendimento;
        });

        const totalPorcentagemTempoAtendimento = chamadosComPorcentagemTempoAtendimento.reduce((acc, porcentagem) => acc + porcentagem, 0);
        const mediaPorcentagemTempoAtendimento = totalPorcentagemTempoAtendimento / chamadosComPorcentagemTempoAtendimento.length;

        console.log(mediaPorcentagemTempoAtendimento)
        setTempoPorcentagem(mediaPorcentagemTempoAtendimento)
        setTecnicosR(nomesTecnicos);
        setChamadosQnt(quantidadesChamados);
        setChamadosVencidos(chamadosFechadosVencidos);
        setNaoChamadosVencidos(chamadosNaoVencidos);
        setFCRCalculado(FCRCalculado)
      })
      
      .catch((error) => {
        console.error('Erro ao obter os detalhes dos chamados:', error);
      });

  }, []);

  const totalChamados = chamadosVencidos.length + chamadosNaoVencidos.length;
  const percentualNaoVencidos = (chamadosNaoVencidos.length / totalChamados) * 100;

  // Configurações do gráfico ApexCharts
  const chartOptions1 = {
    series: [!isNaN(percentualNaoVencidos) ? percentualNaoVencidos.toFixed(2) : 0], // Percentual de Chamados Não Vencidos
    chart: {
      height: 350,
      type: 'radialBar',
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: '70%',
          background: '#fff',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24,
          },
        },
        track: {
          background: '#fff',
          strokeWidth: '67%',
          margin: 0,
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35,
          },
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: '#888',
            fontSize: '17px',
          },
          value: {
            formatter: function (val) {
              return parseFloat(val).toFixed(2) + '%';
            },
            color: '#111',
            fontSize: '36px',
            show: true,
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#ABE5A1'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: 'round',
    },
    labels: ['SLA - Mes Atual'],
  };

  const chartOptions2 = {
    series: [!isNaN(FCRCalculado) ? FCRCalculado.toFixed(2) : 0], // Percentual de Chamados Não Vencidos
    chart: {
      height: 350,
      type: 'radialBar',
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: '70%',
          background: '#fff',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24,
          },
        },
        track: {
          background: '#fff',
          strokeWidth: '67%',
          margin: 0,
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35,
          },
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: '#888',
            fontSize: '17px',
          },
          value: {
            formatter: function (val) {
              return parseFloat(val).toFixed(2) + '%';
            },
            color: '#111',
            fontSize: '36px',
            show: true,
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#ABE5A1'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: 'round',
    },
    labels: ['FCR Mensal'],
  };

  const tecnicosGraph = {
    series: chamadosQnt,
    labels: Array.isArray(tecnicosR) ? tecnicosR : [],
    chart: {
      width: 450,
      type: 'pie',
      toolbar: {
        show: true, // Exibe a barra de ferramentas no gráfico
        tools: {
          download: true, // Exibe o botão de download
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          }
        }
      }
    ]
  };

  const tempoAtendimento = {
    series: [!isNaN(TempoPorcentagem) ? TempoPorcentagem.toFixed(2) : 0],
    chart: {
    type: 'radialBar',
    offsetY: 0,
    sparkline: {
      enabled: true
      
    },
    toolbar: {
      show: true, // Exibe a barra de ferramentas no gráfico
      tools: {
        download: true, // Exibe o botão de download
      },
    }
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      track: {
        background: "#e7e7e7",
        strokeWidth: '97%',
        margin: 5, // margin is in pixels
        dropShadow: {
          enabled: true,
          top: 2,
          left: 0,
          color: '#999',
          opacity: 1,
          blur: 2
          
        }
      },
      dataLabels: {
        name: {
          show: true,
          offsetY: 0
        },
        value: {
          offsetY: -40,
          fontSize: '22px'
        }
      }
    }
  },
  grid: {
    padding: {
      top: 0
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      shadeIntensity: 0.4,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 53, 91]
    },
  },
  labels: ['Tempo gasto medio'],
  };

  return (
    <div className="Metricas_body">
      <div className="Metricas_grid">
        <div className="Metricas1">
          {/* <p>Total de Chamados Vencidos: {chamadosVencidos.length}</p>
          <p>Total de Chamados Não Vencidos: {chamadosNaoVencidos.length}</p>
          <p>Percentual de Chamados Não Vencidos: {percentualNaoVencidos.toFixed(2)}%</p> */}
          <ReactApexChart options={chartOptions1} series={chartOptions1.series} type="radialBar" height={chartOptions1.chart.height} width={380} />
        </div>
        <div className="Metricas2">
        <ReactApexChart options={tecnicosGraph} series={tecnicosGraph.series} type="pie" width={380} />
        </div>
        <div className="Metricas3">
        <ReactApexChart options={chartOptions2} series={chartOptions2.series} type="radialBar" height={chartOptions2.chart.height} width={380} />
        </div>
        <div className="Metricas4"> </div>
        <div className="Metricas5">
        <ReactApexChart options={tempoAtendimento} series={tempoAtendimento.series} type="radialBar" width={480} />
        </div>
        <div className="Metricas6"> </div>
      </div>
    </div>
  );
};

export default Metricas;
