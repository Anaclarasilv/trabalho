
        let db = {
            tutor: [],
            animais: [],
            reservas: []
        };

        function salvarDados() {
            localStorage.setItem('db', JSON.stringify(db));
        }

        function carregarDados() {
            const dados = localStorage.getItem('db');
            if (dados) {
                db = JSON.parse(dados);
            }
        }

        function adicionarTutor() {
            const nome = document.getElementById("Tutor_nome").value;
            const nascimento = document.getElementById("Tutor_nascimento").value;
            
            const id = db.Tutor.length + 1;
            db.Tutor.push({ id, nome, nascimento });
            salvarDados();
            listarTutor();
            listarAniversariantes();
        }

        function adicionarAnimal() {
            const nome = document.getElementById("animal_nome").value;
            const nascimento = document.getElementById("animal_nascimento").value;
            
            const id = db.animais.length + 1;
            db.animais.push({ id, nome, nascimento });
            salvarDados();
            listaranimais();
            listarAniversariantes();
        }

        function adicionarReservas() {
            const data = document.getElementById("Reservas_data").value;
            const horario = document.getElementById("Reservas_horario").value;
            const id_celebrante = document.getElementById("Reservas_tutor").value;
            
            const id = db.Reservas.length + 1;
            db.Reservas.push({ id, data, horario, id_tutor });
            salvarDados();
            listarReservas();
        }

        function listarTutor() {
            let lista = "";
            db.Tutor.forEach(c => {
                lista += `<li>${c.nome} - ${c.nascimento} <button onclick='excluirTutor(${c.id})'>Excluir</button></li>`;
            });
            document.getElementById("lista_Tutor").innerHTML = lista;
            carregarTutorDropdown();
        }

        function listarAnimais() {
            let lista = "";
            db.animais.forEach(p => {
                lista += `<li>${p.nome} - ${p.nascimento} <button onclick='excluiranimais(${p.id})'>Excluir</button></li>`;
            });
            document.getElementById("lista_animais").innerHTML = lista;
        }

        function listarReservas() {
            let lista = "";
            db.reservas.forEach(c => {
                const tutor= db.tutor.find(x => x.id == c.id_tutor)?.nome || 'Desconhecido';
                lista += `<li>${c.data} - ${c.horario} - Tutor: ${tutor} <button onclick='excluirreservas(${c.id})'>Excluir</button></li>`;
            });
            document.getElementById("lista_reservas").innerHTML = lista;
        }

        function excluirTutor(id) {
            db.tutor = db.tutor.filter(c => c.id !== id);
            salvarDados();
            listarTutor();
            listarAniversariantes();
        }

        function excluirAnimais(id) {
            db.animais = db.animais.filter(p => p.id !== id);
            salvarDados();
            listarAnimais();
            listarAniversariantes();
        }

        function excluirReservas(id) {
            db.reservas = db.reservas.filter(c => c.id !== id);
            salvarDados();
            listarReservas();
        }

        function carregarTutorDropdown() {
            let options = "";
            db.tutor.forEach(c => {
                options += `<option value='${c.id}'>${c.nome}</option>`;
            });
            document.getElementById("reserva_tutor").innerHTML = options;
        }

        
            [...db.tutor, ...db.animais].forEach(p => {
                const [ano, mes, dia] = p.nascimento.split("-");
                if (parseInt(dia) === diaAtual && parseInt(mes) === mesAtual) {
                    aniversariantes += `<li>${p.nome} - ${p.nascimento} (Hoje!)</li>`;
                } else if (parseInt(mes) === mesAtual) {
                    aniversariantes += `<li>${p.nome} - ${p.nascimento}</li>`;
                }
            });

        window.onload = function () {
            carregarDados();
            listarTutor();
            listaranimais();
            listarReservas();
            listacadastro();
        };
        
           self.addEventListener('install',(event)=> {
            event.waitUntil(caches.open('lista-de-compras-v1').then((cache) => {
                return cache.addAll([
                    '/',
                    '/index.html',
                    '/style.css',
                    '/church.js'       
                ]);
            })
          );
        });
        
        self.addEventListener('fetch',(event) => {
            event.respondWith(
                caches.match(event.request).then((response) => {
                    return response || fetch(event.request);
                })
            );
        });

function{
    document.getElementById('lista_cadastro').addEventListener('click', function () {
        var novoTexto = document.getElementById('texto').value;
        if (novoTexto) {
            var select = document.getElementById('item');
            var novaOpcao = document.createElement('option');
            novaOpcao.text = novoTexto;
            novaOpcao.value = novoTexto.toLowerCase().replace(/\s+/g, '-');
            select.appendChild(novaOpcao);
            document.getElementById('texto').value = ''; 
        }
    });
    
}
    