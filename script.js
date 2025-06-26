document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menuIcon');
    const navLinks = document.getElementById('navLinks'); 

 
    const dropdownBtns = navLinks.querySelectorAll('.dropdown .dropbtn');
    const dropdowns = navLinks.querySelectorAll('.dropdown');

    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', function() {
            navLinks.classList.toggle('active');

            if (!navLinks.classList.contains('active')) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });


        dropdownBtns.forEach(btn => {
            btn.addEventListener('click', function(event) {
        
                event.preventDefault();

               
                const parentDropdown = this.closest('.dropdown');

              
                dropdowns.forEach(dropdown => {
                    if (dropdown !== parentDropdown && dropdown.classList.contains('active')) {
                        dropdown.classList.remove('active');
                    }
                });

              
                parentDropdown.classList.toggle('active');
            });
        });

       
        navLinks.querySelectorAll('a').forEach(link => {
            if (!link.classList.contains('dropbtn')) { 
                link.addEventListener('click', () => {
                   
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                    }
                
                    dropdowns.forEach(dropdown => {
                        dropdown.classList.remove('active');
                    });
                });
            }
        });

    
        document.addEventListener('click', function(event) {
           
            const isClickInsideNav = navLinks.contains(event.target);
            const isClickOnMenuIcon = menuIcon.contains(event.target);


            const isClickInsideActiveDropdownContent = Array.from(dropdowns).some(dropdown => {
                return dropdown.classList.contains('active') && dropdown.contains(event.target);
            });

            if (!isClickOnMenuIcon && !isClickInsideNav && !isClickInsideActiveDropdownContent) {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
                // Fecha todos os dropdowns abertos
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });

    } else {
        console.warn("Elementos 'menuIcon' ou 'navLinks' não encontrados. Verifique seu HTML e IDs.");
    }


    const abrirCarrinhoBtn = document.getElementById('abrir-carrinho');
    const fecharCarrinhoBtn = document.getElementById('fechar-carrinho');
    const carrinho = document.getElementById('carrinho');

    if (abrirCarrinhoBtn && fecharCarrinhoBtn && carrinho) {
        abrirCarrinhoBtn.addEventListener('click', () => {
            carrinho.classList.toggle('escondido');
        });

        fecharCarrinhoBtn.addEventListener('click', () => {
            carrinho.classList.toggle('escondido');
        });
    } else {
        console.warn("Elementos do carrinho (abrir-carrinho, fechar-carrinho ou carrinho) não encontrados. Verifique seu HTML e IDs.");
    }


    document.querySelectorAll('#menu .box .btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const parent = this.parentElement;
            const nome = parent.querySelector('h3').innerText;
            const preco = parent.querySelector('.price').innerText;
            const imagemUrl = parent.querySelector('img').src;

            adicionarAoCarrinho(nome, preco, imagemUrl);
        });
    });

    // Função para adicionar item ao carrinho
    function adicionarAoCarrinho(nome, preco, imagemUrl) {
        const lista = document.getElementById('itens-carrinho');

        const li = document.createElement('li');

        const img = document.createElement('img');
        img.src = imagemUrl;
        img.alt = nome;

        const span = document.createElement('span');
        span.textContent = `${nome} - ${preco}`;

        li.appendChild(img);
        li.appendChild(span);
        lista.appendChild(li);

        atualizarTotal();
    }

 
    function atualizarTotal() {
        const itens = document.querySelectorAll('#itens-carrinho li');
        let total = 0;

        itens.forEach(item => {
            const texto = item.textContent;

            if (texto.includes('R$')) {
                const valorTexto = texto.split('R$')[1];
                const valor = parseFloat(valorTexto.replace(',', '.'));
                total += valor;
            } else {
                console.warn(`Preço não encontrado ou formato inválido para o item: ${texto}`);
            }
        });

        document.getElementById('total').innerText = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
    }


});