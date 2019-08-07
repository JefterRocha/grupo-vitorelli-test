$('.carousel').slick({
	centerMode: true,
	dots: true,
	arrows: false,
	autoplay: true,
	autoplaySpeed: 5000,
	infinite: true,
	variableWidth: true,
	variableHeight: true
})
$('#biquinis').slick({
	infinite: true,
	slidesToShow: 5,
	slidesToScroll: 1
})

const currencyFormat = { style: 'currency', currency: 'BRL' }

/* COM JQUERY */

$('.last-fashion span:nth-child(4)').each(function() {
	const handledVal = $(this).text().replace(/[R$ ]/g, '').replace(/,/g, '.'),
		newValue = parseFloat(handledVal) + parseFloat(handledVal) / 4
	$(this).text(newValue.toLocaleString('pt-BR', currencyFormat))
})

$(window).scroll(function() {
	if ($(this).scrollTop() > 75) {
		$('header').addClass('header-fixed')
		$('header .logo').addClass('hidden')
	}
	else {
		$('header').removeClass('header-fixed')
		$('header .logo').removeClass('hidden')
	}
})

/* VANILLA */

/* document.querySelectorAll('.last-fashion span:nth-child(4)').forEach(span => {
	const handledVal = span.innerText.replace(/[R$ ]/g, '').replace(/,/g, '.'),
		newValue = parseFloat(handledVal) + parseFloat(handledVal) / 4
	span.innerText = newValue.toLocaleString('pt-BR', currencyFormat)
})

window.addEventListener('scroll', e => {
	if (e.pageY >= 75) {
		document.querySelector('header').classList.add('header-fixed')
		document.querySelector('header .logo img').classList.add('hidden')
	}
	else {
		document.querySelector('header').classList.remove('header-fixed')
		document.querySelector('header .logo img').classList.remove('hidden')
	}
}) */



/* ------------------------!!!ATENÇÃO!!!-------------------------
ESSA PARTE É APENAS UM BÔNUS, DESCONSIDERE EM RELAÇÃO A NÚMERO
DE LINHAS DE CÓDIGO!
----------------------------------------------------------------- */

const cartList = { totalPrice: 0, products: [] }

function addToCart(el) {
	const { parentElement } = el.target
	const id = parentElement.attributes[1].value
	const same = cartList.products.find(product => product.id === id)

	if (same) {
		if (same.id === id) {
			same.amount++
			cartList.products.forEach(product => {
				if (product.id == same.id) product.amount = same.amount
			})
		}
	}
	else {
		const unhandledPrice = parentElement.querySelector(
			':nth-child(4)'
		)
		const price = unhandledPrice.innerText
			.replace(/[R$ ]/g, '')
			.replace(/,/g, '.')
		cartList.products.push({
			id,
			img: parentElement.querySelector('img').src,
			price,
			amount: 1
		})
	}

	const totalPrice = cartList.products.reduce((prev, { amount, price }) =>  prev + (price * amount) , 0)

	cartList.totalPrice = totalPrice

	$('.cart-list-footer span:nth-child(2)').text(totalPrice.toLocaleString('pt-BR', currencyFormat))

	const newItem = cartList.products.map(item => `<tr data-id="${item.id}">
	<td class="product">
		<span style="display: flex;align-items: center">
			<img src="${item.img}">
			<p>Biquíni Cortiniha Palmeira</p>
		</span>
		</td>
		<td class="price">${item.price.toLocaleString('pt-BR', currencyFormat)}</td>
		<td class="amount">${item.amount}</td>
		<td class="remove"><i class="fas fa-times"></i></td>
	</tr>`).join('')

	document.querySelector('table tbody').innerHTML = `<tr>
		<th>PRODUTO</th>
		<th>PREÇO</th>
		<th>QTD</th>
		<th>REMOVER</th>
	</tr>${newItem}`
	$('.remove i').click(removeItem)
}

function removeItem(el) {
	const { parentElement } = el.target
	const id = parentElement.parentElement.attributes[0].value
	cartList.products = cartList.products.filter(product => product.id !== id)
	parentElement.parentElement.outerHTML = ''
	const totalPrice = cartList.products.reduce((prev, { amount, price }) =>  prev + (price * amount) , 0)
	cartList.totalPrice = totalPrice
	$('.cart-list-footer span:nth-child(2)').text(totalPrice.toLocaleString('pt-BR', currencyFormat))
}

$('.buy').click(addToCart)
