'use strict';

const Log = require('../lib/log');
const md5 = require('md5');

module.exports = {
  allMaleHostess : function(req,res){
    let query = "select nome_func,ssn_func,cpf_func,rg_func,cargo_func,sexo_func,telefone,date_format(datanasc_func,'%e/%m/%Y') as datanasc_func from funcionario where cargo_func = 'recepcionista' and sexo_func = 'masculino';";
    req.dbEntity.query(query,function(err,result){
      if(err)
        return res.json(err);
      return res.json(result);
    });
  },
  allFemaleHostess : function(req,res){
    let query = "select nome_func,ssn_func,cpf_func,rg_func,cargo_func,sexo_func,telefone,date_format(datanasc_func,'%e/%m/%Y') as datanasc_func from funcionario where cargo_func = 'recepcionista' and sexo_func = 'feminino';";
    req.dbEntity.query(query,function(err,result){
      if(err)
        return res.json(err);
      return res.json(result);
    });
  },
  allNightWatchman : function(req,res){
    let query = "select nome_func,ssn_func,cpf_func,rg_func,cargo_func,sexo_func,telefone,date_format(datanasc_func,'%e/%m/%Y') as datanasc_func from vigia,funcionario where ssn_func = ssn_vig and turno = 'noturno';";
    req.dbEntity.query(query,function(err,result){
      if(err)
        return res.json(err);
      return res.json(result);
    });
  },
  allEmployeesMarchBirth : function(req,res){
    let query = "select nome_func,cpf_func from funcionario where MONTH(datanasc_func) = '03';";
    req.dbEntity.query(query,function(err,result){
      if(err)
        return res.json(err);
      return res.json(result);
    });
  },
  totalSpentByRent : function(req,res){
    let query = "select * from `nutel`.`Total Gasto Aluguel`;"
    req.dbEntity.query(query, function(err,result){
      if(err){
        return res.json(err);
      }
      return res.json(result);
    });
  },
  totalSpentByClient : function(req,res){
    let query = "select nome_cli,sum(valor) as total from `Total Gasto Aluguel` group by nome_cli;"
    req.dbEntity.query(query, function(err,result){
      if(err)
        return res.json(err);
      return res.json(result);
    });
  },
  totalSpentByClientOrder : function(req,res){
    let query = "select nome_cli,sum(valor) as total from `Total Gasto Aluguel` group by nome_cli order by total asc;"
    req.dbEntity.query(query, function(err,result){
      if(err)
        return res.json(err);
      return res.json(result);
    });
  },
  totalSpentByClientPerYear : function(req,res){
    let query = "select extract(year from data_entrada) as ano,nome_cli,sum(valor) from `total gasto aluguel` where nome_cli = 'param1' group by extract(year from data_entrada);";
    query = query.replace('param1',req.params.nome);
    req.dbEntity.query(query, function(err,result){
      if(err)
        return res.json(err);
      return res.json(result);
    });
  },
  totalProfitByYear : function(req,res){
    let query = "select sum(valor) as Total,extract(year from data_entrada) as Ano from `total gasto aluguel` group by extract(year from data_entrada) order by extract(year from data_entrada) desc;"
    req.dbEntity.query(query, function(err,result){
      if(err)
        return res.json(err);
      return res.json(result);
    });
  },
  clientsRentAllRooms : function(req,res){
    let query = `select nome_cli,cpf_cli
                  from quarto_alugado, cliente
                  where num_quarto_aluga in (select num_quarto from quarto) and cpf_cli = cpf_cli_aluga
                  group by cpf_cli_aluga
                  having count(distinct num_quarto_aluga) = (select count(*) from quarto);`;
    req.dbEntity.query(query,function(err,result) {
      if(err)
        return res.json(err);
      return res.json(result);
    });
  },
  clientsRentAllRoomsYear : function(req,res){
    let query = `select nome_cli,cpf_cli
                  from quarto_alugado, cliente
                  where num_quarto_aluga in (select num_quarto from quarto) and cpf_cli = cpf_cli_aluga and extract(year from datanasc_cli) > '1990'
                  group by cpf_cli_aluga
                  having count(distinct num_quarto_aluga) = (select count(*) from quarto);`;
    req.dbEntity.query(query,function(err,result) {
      if(err)
        return res.json(err);
      return res.json(result);
    });
  },
  clientsRentAllRoomsMatheus : function(req,res){
    let query = `select nome_cli,cpf_cli
                  from quarto_alugado, clientes_at_matheus
                  where num_quarto_aluga in (select num_quarto from quarto) and cpf_cli = cpf_cli_aluga
                  group by cpf_cli_aluga
                  having count(distinct num_quarto_aluga) = (select count(*) from quarto);`;
    req.dbEntity.query(query,function(err,result) {
      if(err)
        return res.json(err);
      return res.json(result);
    });
  },
  averageSpentByAllClients : function(req,res){
    let query = `select avg(total) as \`Média\`
                  from (select nome_cli,sum(valor) as total from \`Total Gasto Aluguel\` group by nome_cli) as totalgastocli;`;
    req.dbEntity.query(query,function(err,result) {
      if(err)
        return res.json(err);
      return res.json(result);
    });
  },
  clientMaxDays : function(req,res) {
    let query = `select nome_cli,max(total_dias) as \`Total de dias\`
                  from (select nome_cli,cpf_cli_aluga,sum(total_dias_aluguel) as total_dias
                  		from (select cpf_cli_aluga, datediff(data_saida,data_entrada) as total_dias_aluguel
                  				from quarto_alugado) as A, cliente
                  		where cpf_cli = cpf_cli_aluga
                  		group by cpf_cli_aluga) as B;`;
    req.dbEntity.query(query,function(err,result) {
      if(err)
        return res.json(err);
      return res.json(result);
    });
  },

}
