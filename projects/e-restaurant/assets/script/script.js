const url = 'https://raw.githubusercontent.com/LordGrim15/JSON-Menu/master/menu.json';
const centeredContainer = ``;
const mostOrderedProductsTitle = `<div class="titleForPages">Most Ordered Products</div>
<div class="row centeredContainer" id="centeredContainerRow"></div>`;
const menuNav = `<div class="foodMenuNavigation">
        <div class="foodMenuButton" id="menuAll">all</div>
        <div class="foodMenuButton" id="menuBreakfast">BREAKFAST</div>
        <div class="foodMenuButton" id="menuLunch">Lunch</div>
        <div class="foodMenuButton" id="menuDesert">dessert</div>
        <div class="foodMenuButton" id="menuVegetarian">vegetarian</div>
        <div class="foodMenuButton" id="menuDrinks">drinks</div>
        <div class="dropdown dropdown-main-button">
            <button class="btn btn-primary dropdown-design dropdown-toggle" id="selectedView" type="button" data-toggle="dropdown">3 COLUMN</button>
            <ul class="dropdown-menu">
              <li id="threeColumn"><a href="#">3 COLUMN</a></li>
              <li id="twoColumn"><a href="#">2 COLUMN</a></li>
              <li id="list"><a href="#">LIST</a></li>
            </ul>
        </div>
    </div>
    <div class="row centeredContainer" id="centeredContainerRow"></div>`;
const newestModalForFood = `
    <div class="modal fade" id="foodModal" tabindex="-1" role="dialog" aria-labelledby="foodModalTitle" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content modalItem modalCenter" id="inModalFooter">
            
        </div>
    </div>
    </div>
    </div>
    `;
const modalForDrinks = `<div class="modal fade" id="drinkModal" tabindex="-1" role="dialog" aria-labelledby="drinkModalTitle" aria-hidden="true">
<div class="modal-dialog modal-sm" role="document">
    <div class="modalCenter modal-content drinksModalContent">
        <h5 class="modalItemTitle drinksModalItemTitle" id="modalDrinksItemTitle"></h5>
        <hr class="drinksModalItemTitleLine" />
        <button type="button" class="xModal close" data-dismiss="modal" aria-label="Close">
<span aria-hidden="true">×</span>
</button>
        <div id="drinksModalContent">
        </div>
    </div>
</div>
</div>`;
const newestFoodModal = `
<h5 class="modalItemTitle" id="modalItemTitle">Basic Omelete</h5>
                <div class="modalItemTitleLine"></div>
                <button type="button" class="xModal close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                    </button>
                    <div id="inModalContent">
                        <div class="foodModalIngredients">
                            <p class="foodModalIngredientsParagraph">Ingredients</p>
                            <ul class="foodModalIngredientsList" id="foodModalIngredientsList">
                            </ul>
                        </div>
                        <div class="foodModalExtras">
                            <p class="foodModalExtrasParagraph">Extras</p>
                            <ul class="foodModalExtrasList" id="foodModalExtrasList">
                            </ul>
                        </div>
                        <div class="modalImageAndAllergensDiv">
                            <img src="./assets/images/Screenshot_2.png" id="modalFoodItemImage" onerror="this.src = '../assets/images/no-image.png', this.classList.add('onerrorImageModal')" class="foodModalItemImage">
                            <p class="foodModalAllergensParagraph">*Allergens:<span id="foodModalAllergens"></span></p>
                        </div>
                    </div>
                    <div> <textarea name="note" id="foodModalNote" cols="30" rows="20" placeholder="Add a note, for example: more cheese, less macaroni"></textarea></div>
                    <hr>
                    <div class="modalFooter">
                    <ul class="tg-list">
                        <p class="eatThere eatOrPickSelected">EAT THERE</p>
                        <li class="tg-list-item">
                            <input class="tgl tgl-ios" id="cb2" type="checkbox"><label class="tgl-btn" for="cb2"></label></li>
                        <p class="pickUp">PICK UP</p>
                    </ul>
                    <div class="groupModalQuantity">
                        <p id="modalQuantity">Quantity</p>
                        <button type="button" class="addAndRemoveModalQuantity" id="removeModalQuantity">-</button>
                        <p class="modalItemQuantity">1</p>
                        <button type="button" class="addAndRemoveModalQuantity" id="addModalQuantity">+</button>
                    </div>
                    <button id="saveOrAddItemToCard" type="button" class="modalAddToCart">add to cart</button>
                    <p class="modalFullPrice" id="modalFullPrice">70 MKD</p>
                    </div>`;
const drinkModal = `<div class="drinksModalAdds">
<img src="./assets/images/Screenshot_2.png" id="modalDrinkItemImage" onerror="this.src = '../assets/images/no-image.png', this.classList.add('onerrorImageModalDrinks')" class="drinksModalItemImage">
</div>
<textarea name="note" id="drinkModalNote" cols="30" rows="20" placeholder="Add a note, for example: room temperature drink"></textarea>
<hr class="drinksModalDivider">
<div class="drinksModalFooter">
<ul class="tg-list drinksTgList">
    <p class="eatThere eatOrPickSelected">EAT THERE</p>
    <li class="tg-list-item">
        <input class="tgl tgl-ios" id="cb3" type="checkbox"><label class="tgl-btn" for="cb3"></label></li>
    <p class="pickUp pickUpDrinks">PICK UP</p>
</ul>
<div class="groupModalQuantity drinksGroupModalQuantity">
    <p id="drinksModalQuantity">Quantity</p>
    <button type="button" class="addAndRemoveModalQuantity" id="removeDrinksModalQuantity">-</button>
    <p class="drinksModalItemQuantity">1</p>
    <button type="button" class="addAndRemoveModalQuantity" id="addDrinksModalQuantity">+</button>
</div>
<button id="addDrinkItemToCard" type="button" class="modalAddToCart drinksModalAddToCart">add to cart</button>
<p class="modalFullPrice drinksModalFullPrice" id="drinksModalFullPrice">60 MKD</p>
</div>`;
let productItemsArr = [];
var currentArray = [];
var currentArraySave;
let mainContainer = document.getElementById('mainContainer');
const menu = document.getElementById(`menu`);
const home = document.getElementById(`home`);
var columnSaved = 4;

fetch(url)
	.then(function(response) {
		return response.json();
	})
	.then(function(data) {
		productItemsArr = [];
		productItemsArr.push(data.results);
		printMostOrderedProducts();
	})
	.catch(function(error) {
		console.log(error);
	});

function productsInCartNumber() {
	if (!localStorage.getItem('productsArr')) {
		document.querySelector('.inCartQuantity').textContent = '0';
	} else {
		var productsArr = JSON.parse(localStorage.getItem('productsArr'));
		document.querySelector('.inCartQuantity').textContent = productsArr.length;
	}
}
productsInCartNumber();

function printMostOrderedProducts() {
	currentArray = productItemsArr[0].filter((x) => x.ordered === 'most ordered');
	mainContainer.innerHTML = mostOrderedProductsTitle;
	document.getElementsByClassName(`titleForPages`).innerHTML = `Most Ordered Products`;
	printMenu('none', 'most ordered', newestModalForFood, 3);
	printCard(document.getElementById('centeredContainerRow'), currentArray, 3);
	document.getElementById('divModal').innerHTML = newestModalForFood;
	modalEventListener();
}

function printCardItems() {
	currentArray = JSON.parse(localStorage.getItem('productsArr'));
	mainContainer.innerHTML = mostOrderedProductsTitle;
	document.getElementsByClassName(`titleForPages`).innerHTML = `Card`;
	printCard(document.getElementById('centeredContainerRow'), currentArray, 13);
	document.getElementById('divModal').innerHTML = newestModalForFood + modalForDrinks;
	modalEventListenerForCard();
	productSectionElementsListener();
}

function printCard(element, array, column) {
	columnSaved = column;
	element.innerHTML = ``;
	for (let i = 0; i < array.length; i++) {
		if (column != 13) {
			var cardForEverywere = `<span class="itemImageText"><img src="./assets/images/giphyo.gif" width="150px"></span>
            <img class="${column === 12
				? 'card-img-top imageListSize'
				: 'card-img-top'}" src="./assets/images/Screenshot_2.png" onerror="this.src = '../assets/images/no-image.png', this.classList.add('onerrorImage')" alt="Card image cap">
            </div>
            <div class="${column === 12 ? 'cardItemListContent' : 'cardItemContent'}">
            <h5 class="${column === 12 ? 'cardListTitle' : 'cardTitle'}">${array[i].itemName}</h5>
            <div class="${column === 12 ? 'itemListPrice' : 'itemPrice'}">
                ${array[i].price} MKD
            </div>`;
		} else {
			var cardForInCard = `<div class="removeProduct"><i class="fas fa-times"></i>
            </div>
            <img src="./assets/images/Screenshot_2.png" onerror="this.src = '../assets/images/no-image.png', this.classList.add('onerrorImage')" alt="Card image cap" class="cardProductImage">
            <h5 class="producCardTitle">${array[i].dataForObject.itemName}</h5>
            <div class="quantityContainer">
                <p class="quantityParagraph">Quantity</p>
                <button type="button" class="quantityStyleButtons"><i class="fas fa-minus"></i></button>
                <p class="productQuantityNumber">${array[i].itemQuantity}</p>
                <button type="button" class="quantityStyleButtons"><i class="fas fa-plus"></i></button>
            </div>
            <div class="containerCardPrice">
                <p class="productCardPrice">${array[i].fullPrice} MKD</p>
			</div>`;
		}
		element.innerHTML += `
        <div class="flex-sm-column col-sm-${column != 13 ? column : 12}" >
        <div data-toggle="modal" class="${column === 12 || column === 13
			? 'pointer listCardElement'
			: 'pointer'}" data-target="${array[i].mainCategory === undefined
			? array[i].dataForObject.mainCategory != 'Drink' ? '#foodModal' : '#drinkModal'
			: array[i].mainCategory != 'Drink' ? '#foodModal' : '#drinkModal'}" data-text="${i}">
        <div class="${column != 13 ? 'cardImageContainer' : 'productContainer'}">
        ${column != 13 ? cardForEverywere : cardForInCard}
        </div>
	</div>
	</div>`;
	}
}

function selectedViewFunction() {
	if (columnSaved === 4) {
		document.getElementById('selectedView').innerText = '3 COLUMN';
	} else if (columnSaved === 6) {
		document.getElementById('selectedView').innerText = '2 COLUMN';
	} else {
		document.getElementById('selectedView').innerText = 'LIST';
	}
}

function modalEventListener() {
	$(`#foodModal`).on('show.bs.modal', function(event) {
		let button = $(event.relatedTarget);
		var item = currentArray[parseInt(button.data('text'))];
		let currentItemQuantity = item.itemQuantity === undefined ? 1 : item.itemQuantity;
		priceItem = item.price === undefined ? item.fullPrice : item.price;
		document.getElementById('inModalFooter').innerHTML = newestFoodModal;
		document.getElementById('modalItemTitle').innerHTML =
			item.itemName === undefined ? item.dataForObject.itemName : item.itemName;
		for (const ingrediant of item.ingredients === undefined ? item.dataForObject.ingredients : item.ingredients) {
			document.getElementById(
				'foodModalIngredientsList'
			).innerHTML += `<li><i class="fas fa-check modalItemCheck"></i>${ingrediant}</li>`;
		}
		if (item.extras === undefined) {
			for (const extras of item.dataForObject.extras) {
				document.getElementById(
					'foodModalExtrasList'
				).innerHTML += `<li><input id="${extras.extrasName}" ${item.extrasAdded.indexOf(extras.extrasName) ===
				-1
					? ''
					: 'checked'} type="checkbox" class="checkbox" onclick="checkCheckBox(this,'${extras.price}')"/><label for="${extras.extrasName}"><abbr title="${extras.price} MKD">${extras.extrasName}</abbr></label></li>`;
			}
		} else {
			for (const extras of item.extras) {
				document.getElementById(
					'foodModalExtrasList'
				).innerHTML += `<li><input id="${extras.extrasName}" type="checkbox" class="checkbox" onclick="checkCheckBox(this,'${extras.price}')"/><label for="${extras.extrasName}"><abbr title="${extras.price} MKD">${extras.extrasName}</abbr></label></li>`;
			}
		}
		for (const allergen of item.allergens === undefined ? item.dataForObject.allergens : item.allergens) {
			if (
				(item.allergens === undefined
					? item.dataForObject.allergens[item.dataForObject.allergens.length - 1]
					: item.allergens[item.allergens.length - 1]) === allergen
			) {
				document.getElementById('foodModalAllergens').innerText += ` ${allergen}`;
			} else {
				document.getElementById('foodModalAllergens').innerText += ` ${allergen},`;
			}
		}
		document.getElementById(`cb2`).addEventListener(`click`, pickOrEatClass.bind(null, 'cb2'));
		document.getElementById(`cb2`).checked = item.pickOrEat;
		pickOrEatClass(`cb2`);
		addOrRemoveQuantity(
			document.getElementById('addModalQuantity'),
			document.getElementById('removeModalQuantity'),
			document.querySelector('.modalItemQuantity'),
			currentItemQuantity
		);
		document.getElementById('modalFullPrice').innerHTML = `${item.price === undefined
			? item.fullPrice
			: item.price} MKD`;
		if (item.extras != undefined) {
			document.getElementById('saveOrAddItemToCard').addEventListener(`click`, function() {
				setItemsInLocalStorage(item, priceItem, document.getElementById('foodModalNote'));
				$('#foodModal').modal('hide');
			});
		} else {
			document.getElementById('saveOrAddItemToCard').innerHTML = 'save';
			document.getElementById('foodModalNote').value = item.note;
			document.querySelector(`.modalItemQuantity`).innerHTML = currentItemQuantity;
			document.getElementById('saveOrAddItemToCard').addEventListener(`click`, function() {
				let extrasArrayChecked = [];
				var x = document.querySelectorAll('.checkbox');
				for (const item of x) {
					if (item.checked) {
						extrasArrayChecked.push(item.id);
					}
				}
				item.extrasAdded = extrasArrayChecked;
				item.fullPrice = priceItem;
				item.itemQuantity = parseInt(document.querySelector(`.modalItemQuantity`).innerHTML);
				item.pickOrEat = document.getElementById(`cb2`).checked;
				localStorage.setItem('productsArr', JSON.stringify(currentArray));
				currentArray = currentArraySave;
				$('#foodModal').modal('hide');
				addCartItem();
			});
		}
	});
	$(`#drinkModal`).on('show.bs.modal', function(event) {
		let button = $(event.relatedTarget);
		let item = currentArray[parseInt(button.data('text'))];
		let currentItemQuantity = item.itemQuantity === undefined ? 1 : item.itemQuantity;
		priceItem = item.price;
		document.getElementById('drinksModalContent').innerHTML = drinkModal;
		document.getElementById('modalDrinksItemTitle').innerHTML =
			item.itemName === undefined ? item.dataForObject.itemName : item.itemName;
		document.getElementById('drinksModalFullPrice').innerHTML = `${item.price === undefined
			? item.fullPrice
			: item.price} MKD`;
		document.getElementById(`cb3`).addEventListener(`click`, pickOrEatClass.bind(null, 'cb3'));
		document.getElementById(`cb3`).checked = item.pickOrEat;
		pickOrEatClass(`cb3`);
		addOrRemoveQuantity(
			document.getElementById(`addDrinksModalQuantity`),
			document.getElementById(`removeDrinksModalQuantity`),
			document.querySelector(`.drinksModalItemQuantity`),
			currentItemQuantity
		);
		if (item.fullPrice != undefined) {
			document.getElementById('addDrinkItemToCard').innerText = 'save';
			document.getElementById('drinkModalNote').value = item.note;
			document.querySelector(`.drinksModalItemQuantity`).innerHTML = currentItemQuantity;
			document.getElementById(`addDrinkItemToCard`).addEventListener(`click`, function() {
				item.itemQuantity = parseInt(document.querySelector(`.drinksModalItemQuantity`).innerHTML);
				item.pickOrEat = document.getElementById(`cb3`).checked;
				localStorage.setItem('productsArr', JSON.stringify(currentArray));
				currentArray = currentArraySave;
				$('#drinkModal').modal('hide');
				addCartItem();
			});
		} else {
			document.getElementById(`addDrinkItemToCard`).addEventListener(`click`, function() {
				setItemsInLocalStorage(item, priceItem, document.getElementById('drinkModalNote'));
				$('#drinkModal').modal('hide');
			});
		}
	});
}

function checkCheckBox(thisItem, price) {
	let parsingPrice = parseInt(price);
	if (thisItem.checked === true) {
		priceItem += parsingPrice;
		modalFullPrice.innerHTML = `${priceItem} MKD`;
		thisItem.nextElementSibling.style.color = 'green';
	} else if (thisItem.checked === false) {
		priceItem -= parsingPrice;
		modalFullPrice.innerHTML = `${priceItem} MKD`;
		thisItem.nextElementSibling.style.color = 'unset';
	}
}

function pickOrEatClass(id) {
	document.getElementById(id).checked === true
		? document.getElementsByClassName(`pickUp`)[0].classList.add(`eatOrPickSelected`) &
			document.getElementsByClassName(`eatThere`)[0].classList.remove(`eatOrPickSelected`)
		: document.getElementsByClassName(`eatThere`)[0].classList.add(`eatOrPickSelected`) &
			document.getElementsByClassName(`pickUp`)[0].classList.remove(`eatOrPickSelected`);
}

function addOrRemoveQuantity(param1, param2, param3, param4) {
	param1.addEventListener(`click`, function() {
		if (param4 < 10) {
			param4 += 1;
			param3.innerText = param4;
		} else {
			alert("You can't order more then 10 items!(current items: 10)");
		}
	});

	param2.addEventListener(`click`, function() {
		if (param4 >= 2) {
			param4 -= 1;
			param3.innerText = param4;
		}
	});
}

function setItemsInLocalStorage(data, priceItem, note) {
	let extrasArrayChecked = [];
	let objectPassedToCard = {};
	if (data.mainCategory != 'Drink') {
		var x = document.querySelectorAll('.checkbox');
		for (const item of x) {
			if (item.checked) {
				extrasArrayChecked.push(item.id);
			}
		}
		objectPassedToCard.extrasAdded = extrasArrayChecked;
	}
	if (localStorage.getItem('productsArr')) {
		var productsArr = JSON.parse(localStorage.getItem('productsArr'));
	} else {
		var productsArr = [];
	}
	objectPassedToCard.dataForObject = data;
	objectPassedToCard.fullPrice = priceItem;
	objectPassedToCard.itemQuantity =
		document.querySelector('.modalItemQuantity') === null
			? parseInt(document.querySelector('.drinksModalItemQuantity').innerHTML)
			: parseInt(document.querySelector('.modalItemQuantity').innerHTML);
	objectPassedToCard.pickOrEat =
		document.getElementById(`cb3`) === null
			? document.getElementById(`cb2`).checked
			: document.getElementById(`cb3`).checked;
	objectPassedToCard.note = note.value;
	productsArr.push(objectPassedToCard);
	localStorage.setItem('productsArr', JSON.stringify(productsArr));
	productsInCartNumber();
}
home.addEventListener(`click`, function() {
	printMostOrderedProducts(currentArray);
	home.classList.add('eatOrPickSelected');
	menu.classList.remove('eatOrPickSelected');
	contact.classList.remove('eatOrPickSelected');
});
menu.addEventListener('click', function() {
	printMenu('menuAll', 'All', newestModalForFood + modalForDrinks, 4);
	home.classList.remove('eatOrPickSelected');
	menu.classList.add('eatOrPickSelected');
	contact.classList.remove('eatOrPickSelected');
});
card.addEventListener('click', function() {
	addCartItem();

	var cartOverlay = document.querySelector('.cart-overlay');
	var cartDOM = document.querySelector('.cart');
	document.querySelector('.close-cart').addEventListener('click', () => {
		hideCart(cartOverlay, cartDOM);
	});

	closeCartBtn.addEventListener('click', function() {
		hideCart(cartOverlay, cartDOM);
	});
});

function filterAndPrintEventListeners() {
	mainContainer.style = 'margin-bottom: 83px;';
	document.getElementById(`menuAll`).addEventListener(`click`, function() {
		printMenu('menuAll', 'All', newestModalForFood + modalForDrinks, columnSaved);
	});
	document.getElementById(`menuBreakfast`).addEventListener(`click`, function() {
		printMenu('menuBreakfast', 'Breakfast', newestModalForFood, columnSaved);
	});
	document.getElementById(`menuLunch`).addEventListener(`click`, function() {
		printMenu('menuLunch', 'Lunch', newestModalForFood, columnSaved);
	});
	document.getElementById(`menuDesert`).addEventListener(`click`, function() {
		printMenu('menuDesert', 'Desert', newestModalForFood, columnSaved);
	});
	document.getElementById(`menuVegetarian`).addEventListener(`click`, function() {
		printMenu('menuVegetarian', 'Vegetarian', newestModalForFood, columnSaved);
	});
	document.getElementById(`menuDrinks`).addEventListener(`click`, function() {
		printMenu('menuDrinks', 'Drink', modalForDrinks, columnSaved);
	});
}

function printMenu(menuNavigation, navigation, modal, column) {
	mainContainer.style = 'margin-bottom: 83px;';
	if (navigation != 'most ordered') {
		mainContainer.innerHTML = menuNav;
		document.getElementById(menuNavigation).classList.add(`selected`);
		currentArray =
			navigation != 'All' ? productItemsArr[0].filter((x) => x.mainCategory === navigation) : productItemsArr[0];
		document.getElementById('threeColumn').addEventListener(`click`, function() {
			printCard(document.getElementById('centeredContainerRow'), currentArray, 4);
			document.getElementById('selectedView').innerText = '3 COLUMN';
		});
		document.getElementById('twoColumn').addEventListener(`click`, function() {
			printCard(document.getElementById('centeredContainerRow'), currentArray, 6);
			document.getElementById('selectedView').innerText = '2 COLUMN';
		});
		document.getElementById('list').addEventListener(`click`, function() {
			printCard(document.getElementById('centeredContainerRow'), currentArray, 12);
			document.getElementById('selectedView').innerText = 'LIST';
		});
	} else {
		currentArray = productItemsArr[0].filter((x) => x.ordered === 'most ordered');
	}
	document.getElementById('divModal').innerHTML = modal;
	printCard(document.getElementById('centeredContainerRow'), currentArray, column);
	modalEventListener();
	if (navigation != 'most ordered') {
		filterAndPrintEventListeners();
		selectedViewFunction();
	}
}

// CART

function productSectionElementsListener() {
	if (localStorage.getItem('productsArr')) {
		document.querySelector('#centeredContainerRow').addEventListener('click', (e) => {
			productSectionElements(e.target, e);
		});
	}
}

function productSectionElements(el, e) {
	if (el.classList.value === `fas fa-times`) {
		e.stopPropagation();
		if (confirm(`Delete item ?`)) {
			currentArray.splice(
				parseInt(el.parentElement.parentElement.parentElement.attributes['data-text'].value),
				1
			);
			localStorage.setItem('productsArr', JSON.stringify(currentArray));
			printCardItems();
			productsInCartNumber();
		}
	} else if (el.classList[0] === `quantityStyleButtons` || el.parentElement.className === `quantityStyleButtons`) {
		e.stopPropagation();
		if (el.parentElement.parentElement.parentElement.attributes['data-text'] === undefined) {
			var currentItem = parseInt(
				el.parentElement.parentElement.parentElement.parentElement.attributes['data-text'].value[0]
			);
			if (el.classList[1] != 'fa-minus') {
				if (el.classList[1] === 'fa-plus') {
					currentArray[currentItem].itemQuantity += 1;
					el.parentElement.previousElementSibling.innerText = currentArray[currentItem].itemQuantity;
				} else if (el.firstElementChild.classList[1] === 'fa-minus') {
					currentArray[currentItem].itemQuantity -= 1;
					el.parentElement.nextElementSibling.innerText = currentArray[currentItem].itemQuantity;
				} else if (el.firstElementChild.classList[1] === 'fa-plus') {
					currentArray[currentItem].itemQuantity += 1;
					el.parentElement.previousElementSibling.innerText = currentArray[currentItem].itemQuantity;
				}
			} else {
				currentArray[currentItem].itemQuantity -= 1;
				el.parentElement.nextElementSibling.innerText = currentArray[currentItem].itemQuantity;
			}
		} else {
			var currentItem = parseInt(el.parentElement.parentElement.parentElement.attributes['data-text'].value[0]);
			if (el.classList[1] != 'fa-minus') {
				if (el.classList[1] === 'fa-plus') {
					currentArray[currentItem].itemQuantity += 1;
					el.previousElementSibling.innerText = currentArray[currentItem].itemQuantity;
				} else if (el.firstElementChild.classList[1] === 'fa-minus') {
					currentArray[currentItem].itemQuantity -= 1;
					el.nextElementSibling.innerText = currentArray[currentItem].itemQuantity;
				} else if (el.firstElementChild.classList[1] === 'fa-plus') {
					currentArray[currentItem].itemQuantity += 1;
					el.previousElementSibling.innerText = currentArray[currentItem].itemQuantity;
				}
			} else {
				currentArray[currentItem].itemQuantity -= 1;
				el.nextElementSibling.innerText = currentArray[currentItem].itemQuantity;
			}
		}

		localStorage.setItem('productsArr', JSON.stringify(currentArray));
	}
}

const contact = document.getElementById('contact');
contact.addEventListener('click', function() {
	mainContainer.innerHTML = ``;
	mainContainer.style = 'margin-bottom: 0;';
	mainContainer.innerHTML = `
    <div class="row contact">
        <div class="col-sm-6"> 
            <div class="mail_form">
                <h1 class="headers_contact">CONTACT US</h1>
                <form id="contact-form">
                    <input type="text" name="name" id="name" placeholder="Name" required/>
                    <br>
                    <input type="text" name="e-mail" id="email" placeholder="E-mail" required />
                    <br>
                    <input type="number" name="phone" id="phone" placeholder="Phone" />
                    <br>
                    <textarea name="remark" id="text" placeholder="Questions/Comments" cols="40" rows="4" required></textarea>
                    <br>
                    <button type="submut" id="btn_send">SEND</button>
                </form>
            </div>
        </div>
        <div class="col-sm-6 number">
            <div class="call_us"><h1 class="headers_contact" ></h1>
                <button type="" class = "phone"><i class="fa fa-phone" style="font-size:20px"></i> +389 70 123 456</button>
            </div>
            <div class="working_hours">
                <h1 class="headers_contact_hours">Working Hours</h1>
                <div class="days_of_week">
                    <p>Monday .............. <strong> 9.30 - 15.30</strong></p>
                    <p>Tuesday ............. <strong> 9.30 - 15.30</strong></p>
                    <p>Wednesday ...... <strong> 9.30 - 15.30</strong></p>
                    <p>Thursday ..........<strong> 9.30 - 15.30</strong></p>
                    <p>Friday .................<strong> 9.30 - 15.30</strong></p>
                    <p>Saturday <strong>closed</strong></p>
                    <p>Sunday <strong>closed</strong></p>
                </div>
            </div>
            <br>
            <p class="address"><i class="fa fa-map-marker"  style="font-size:18px;color:#C8B273"></i> 11TH OCTOBER ST. 33, SKOPJE 1000</p>
        </div>
    </div>
    <!-- <div class="row map"> -->
        <iframe class= "iframe "src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11862.546673614783!2d21.439687!3d41.98661!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb73c65132f7d38d2!2sSeavus%20Group!5e0!3m2!1sen!2smk!4v1592334183573!5m2!1sen!2smk" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
    <!-- </div> -->
`;
	home.classList.remove('eatOrPickSelected');
	menu.classList.remove('eatOrPickSelected');
	contact.classList.add('eatOrPickSelected');

	//CONTACT VALIDATION
	const name = document.getElementById('name');
	const email = document.getElementById('email');
	const phone = document.getElementById('phone');
	const text = document.getElementById('text');

	var nameCheck = false;
	var emailCheck = false;
	var phoneCheck = false;
	var textCheck = false;

	function ValidateName(inputText, checker) {
		var nameformat = /^[a-zA-Z]{3,20}(?: [a-zA-Z]+){0,2}$/;
		if (inputText.value.match(nameformat)) {
			checker = true;
			inputText.style.border = 'none';
		} else {
			inputText.style.border = 'Solid red 1px';
			checker = false;
		}
	}

	function ValidateEmail(inputText, checker) {
		var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (inputText.value.match(mailformat)) {
			checker = true;
			inputText.style.border = 'none';
		} else {
			inputText.style.border = 'Solid red 1px';
			checker = false;
		}
	}

	function ValidatePhoneNumber(inputText, checker) {
		if (inputText.value.trim().length > 15) {
			inputText.style.border = 'Solid red 1px';
			checker = false;
		} else {
			inputText.style.border = 'none';
			checker = true;
		}
	}

	function ValidateText(inputText, checker) {
		if (inputText.value.length < 10 || inputText.value.length > 300) {
			inputText.style.border = 'Solid red 1px';
			checker = false;
		} else {
			inputText.style.border = 'none';
			checker = true;
		}
	}

	name.addEventListener('focusout', function() {
		ValidateName(name, nameCheck);
	});

	email.addEventListener('focusout', function() {
		ValidateEmail(email, emailCheck);
	});

	phone.addEventListener('focusout', function() {
		ValidatePhoneNumber(phone, phoneCheck);
	});

	text.addEventListener('focusout', function() {
		ValidateText(text, textCheck);
	});
});

// NEW CARD

// cart variables
const closeCartBtn = document.querySelector('.close-cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartDOM = document.querySelector('.cart');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');
const cartFooter = document.querySelector('.cart-footer');

let cart = [];
var priceForAll = 0;

function addCartItem() {
	showCart();
	productsArr = JSON.parse(localStorage.getItem('productsArr'));
	priceForAll = 0;
	if (productsArr != null && productsArr.length != 0) {
		currentArray = productsArr.sort(
			(a, b) => (a.pickOrEat > b.pickOrEat ? 1 : a.pickOrEat === b.pickOrEat ? 1 : -1)
		);
		cartContent.innerHTML = '';
		document.getElementById('cartTitle').innerText = 'Your cart';
		let counter = 0;
		for (const product of productsArr) {
			let cartItems = document.createElement('div');
			cartItems.classList.add('cart-item');
			cartItems.classList.add(counter);
			cartItems.setAttribute('data-toggle', 'modal');
			cartItems.setAttribute(
				'data-target',
				`${product.dataForObject.mainCategory === 'Drink' ? '#drinkModal' : '#foodModal'}`
			);
			cartItems.setAttribute('data-text', counter);
			priceForAll += product.itemQuantity * product.fullPrice;
			cartItems.innerHTML += `
        <img src="./assets/images/Screenshot_2.png" alt="product">
        <div>
        <h4>${product.itemName === undefined ? product.dataForObject.itemName : product.itemName}</h4>
        <h5>${product.fullPrice * product.itemQuantity} MKD</h5>
        <span class="remove-item"><span style="font-size: 15px;">remove</span> <i class="fa fa-trash" aria-hidden="true"></i></span>
        </div>
        <div>
        <i class="fas fa-chevron-up"></i>
        <p class="item-amount">${product.itemQuantity}</p>
        <i class="fas fa-chevron-down"></i>
        </div>`;
			cartContent.appendChild(cartItems);
			cartItems.addEventListener('click', (e) => {
				cartContentEventListener(e.target, e);
			});
			counter++;
		}
		cartFooter.innerHTML = `<h3>your total: <span class="cart-total">${priceForAll},00 MKD</span></h3>
        <button class="clear-cart">CLEAR CART</button>
        <button class="place-order">PLACE ORDER</button>`;
		cartFooter.addEventListener('click', (e) => {
			cartContentEventListener(e.target);
		});
	} else {
		cartContent.innerHTML = '';
		cartFooter.innerHTML = '';
		document.getElementById('cartTitle').innerText = 'Your cart is empty!';
	}
}

function showCart() {
	cartOverlay.classList.add('transparentBcg');
	cartDOM.classList.add('showCart');
	document.getElementById('divModal').innerHTML = newestModalForFood + modalForDrinks;
	modalEventListener();
	currentArraySave = currentArray;
}

function hideCart(elementOne, elementTwo) {
	elementOne.classList.remove('transparentBcg');
	elementTwo.classList.remove('showCart');
	currentArray = currentArraySave;
}

function cartContentEventListener(el, e) {
	if (el.closest(`.remove-item`)) {
		e.stopPropagation();
		priceForAll -= parseInt(e.currentTarget.children[1].children[1].innerHTML.split(` `)[0]);
		productsArr.splice(parseInt(e.currentTarget.classList[1]), 1);
		localStorage.setItem('productsArr', JSON.stringify(productsArr));
		productsInCartNumber();
		currentArray = currentArraySave;
		if (productsArr.length === 0) {
			localStorage.removeItem('productsArr');
		}
		addCartItem();
	} else if (el.classList.contains('clear-cart')) {
		localStorage.removeItem('productsArr');
		productsInCartNumber();
		currentArray = currentArraySave;
		addCartItem();
	} else if (el.classList.contains('fa-chevron-up')) {
		e.stopPropagation();
		if (productsArr[parseInt(el.parentElement.parentElement.classList[1])].itemQuantity >= 10) {
			alert("You can't order more then 10 items!");
		} else {
			productsArr[parseInt(el.parentElement.parentElement.classList[1])].itemQuantity += 1;
			el.nextElementSibling.innerHTML =
				productsArr[parseInt(el.parentElement.parentElement.classList[1])].itemQuantity;
			localStorage.setItem('productsArr', JSON.stringify(productsArr));
			currentArray = currentArraySave;
			addCartItem();
		}
	} else if (el.classList.contains('fa-chevron-down')) {
		e.stopPropagation();
		if (productsArr[parseInt(el.parentElement.parentElement.classList[1])].itemQuantity > 1) {
			productsArr[parseInt(el.parentElement.parentElement.classList[1])].itemQuantity -= 1;
			el.previousElementSibling.innerHTML =
				productsArr[parseInt(el.parentElement.parentElement.classList[1])].itemQuantity;
			localStorage.setItem('productsArr', JSON.stringify(productsArr));
			currentArray = currentArraySave;
			addCartItem();
		} else {
			alert("You can't order less then 1 item!");
		}
	}
}

const loginModal = `<div class="modal" id="formModal" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
        <div class="loginModalHeader">
            <button type="button" class="close modalFormClose" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body modalFormBody">
            <div class="divTitleFormModal">
                <h1 class="titleFormModal">LOG IN</h1>
            </div>
            <div class="contentFormModal">
                <div class="inputsFormModal">
                    <input class="userNameFormModal" type="text" placeholder="Username">
                    <input class="passwordFormModal" type="password" placeholder="Password">
                </div>
                <div class="contentInteractionForm">
                    <input type="checkbox" name="rememberMe" id="checkboxRememberMeFormModal">
                    <label for="rememberMe">Remember me</label>
                    <p class="forgotPasswordFormModal">Forgot password?</p>
                </div>
                <button type="button" class="buttonFormModal">LOG IN</button>
            </div>
        </div>
        <div class="modal-footer footerModalForm">
            <p class="modalFormSignUp">Don't have an account yet?</p>
            <div>
            <button type="button" class="buttonFormModalSignUp" id="signUpDivModal" onclick="changeModal('signUp')">SIGN UP</button>
            </div>
        </div>
    </div>
</div>
</div>`;
const signUpModal = `<div id="formModal" class="modal" role="dialog" aria-labelledby="signUpModalTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="loginModalHeader">
                        <button type="button" class="close modalFormClose" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div class="modal-body modalFormBody">
                        <div class="divTitleFormModal">
                            <h1 class="titleFormModal">SIGN UP</h1>
                        </div>
                        <div class="contentFormModal">
                            <div class="inputsSignUpFormModal">
                                <input class="fullNameFormModal" type="text" placeholder="Full Name">
                                <input class="emailFormModal" type="text" placeholder="E-mail">
                                <input class="phoneFormModal" type="number" placeholder="Phone number">
                                <input class="userNameFormModal" type="text" placeholder="Username">
                                <input class="passwordFormModal" type="password" placeholder="Password">
                            </div>
                            <div class="contentInteractionForm">
                                <p class="rightsFormModal">By signing up, you agree to our Terms , Data Policy and Cookies Policy.</p>
                            </div>
                            <button type="button" class="buttonFormModal">Save and continue</button>
                        </div>
                    </div>
                    <div class="modal-footer footerModalForm">
                        <p class="modalFormSignUp">Have an account?</p>
                        <div><button type="button" class="buttonFormModalSignUp" id="signInFormModal" onclick="changeModal('logIn')" tabindex = "0" >LOG IN</button></div>
                    </div>
                </div>
            </div>
			</div>`;

let formDivModal = document.getElementById(`formDivModal`);
formDivModal.innerHTML = loginModal;

function changeModal(param) {
	$('#formModal').modal('hide');
	if (param === `signUp`) {
		formDivModal.innerHTML = signUpModal;
		document.getElementById(`modalButton`).innerText = `Sign Up`;
	} else {
		formDivModal.innerHTML = loginModal;
		document.getElementById(`modalButton`).innerText = `Log In`;
	}
	$('#formModal').modal('show');
}
