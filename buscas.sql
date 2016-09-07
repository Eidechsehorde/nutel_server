#Barbara Carvalho
#Matheus Solha

#Todos os recepcionistas homens
select nome_func,ssn_func,cpf_func,rg_func,cargo_func,sexo_func,telefone,date_format(datanasc_func,'%e/%m/%Y') as datanasc_func
from funcionario
where cargo_func = 'recepcionista' and sexo_func = 'masculino';

#Todos os recepcionistas mulheres
select nome_func,ssn_func,cpf_func,rg_func,cargo_func,sexo_func,telefone,date_format(datanasc_func,'%e/%m/%Y') as datanasc_func
from funcionario
where cargo_func = 'recepcionista' and sexo_func = 'feminino';

#Todos os vigias noturnos
select nome_func,ssn_func,cpf_func,rg_func,cargo_func,sexo_func,telefone,date_format(datanasc_func,'%e/%m/%Y') as datanasc_func
from vigia,funcionario
where ssn_func = ssn_vig and turno = 'noturno';

#Todos os funcionarios nascidos em março
select nome_func,cpf_func
from funcionario
where MONTH(datanasc_func) = '03';

#Total gasto por aluguel
select *
from `nutel`.`Total Gasto Aluguel`;

#Total gasto por cliente
select nome_cli,sum(valor) as total
from `Total Gasto Aluguel`
group by nome_cli;

#Total gasto por cliente por ano
select extract(year from data_entrada) as ano,nome_cli,sum(valor)
from `total gasto aluguel`
where nome_cli = 'param1'
group by extract(year from data_entrada);

#Total de lucro por ano
select sum(valor) as Total,extract(year from data_entrada) as Ano
from `total gasto aluguel`
group by extract(year from data_entrada)
order by extract(year from data_entrada) desc;

#Média de gasto de todos os clientes
select avg(total) as `Média`
from (select nome_cli,sum(valor) as total
      from `Total Gasto Aluguel`
      group by nome_cli) as totalgastocli;

#Cliente que ficou mais dias no hotel
select nome_cli,max(total_dias) as `Total de dias`
from (select nome_cli,cpf_cli_aluga,sum(total_dias_aluguel) as total_dias
      from (select cpf_cli_aluga, datediff(data_saida,data_entrada) as total_dias_aluguel
            from quarto_alugado) as A, cliente
where cpf_cli = cpf_cli_aluga
group by cpf_cli_aluga) as B;
