// Scorage Controller
const StorageCtrl = (function(){
    return{
        storeItem: function(item){
            let items;

            if(localStorage.getItem('items') === null){
                items = [];
                items.push(item);
                localStorage.setItem('items', JSON.stringify(items));
            }
            else{
                items = JSON.parse(localStorage.getItem('items'));
                items.push(item);
                localStorage.setItem('items', JSON.stringify(items));
            }

            localStorage.getItem('items', )
        },

        getItemsFromStorage: function(){
            let items;
            if(localStorage.getItem('items') === null){
                items = []; 
            }
            else{
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        },

        updateItemStorage: function(updatedItem){
            let items = JSON.parse(localStorage.getItem('items'));
            items.forEach(function(item, index){
                if(updatedItem.id === item.id){
                    items.splice(index, 1, updatedItem);
                }
            });
            localStorage.setItem('items', JSON.stringify(items));

        },

        deleteItemFromStorage: function(id){
            let items = JSON.parse(localStorage.getItem('items'));
            items.forEach(function(item, index){
                if(id === item.id){
                    items.splice(index, 1);
                }
            });
            localStorage.setItem('items', JSON.stringify(items));

        },

        clearItemsFromStorage: function(){
            localStorage.removeItem("items");
        }
    }
})();


// Item Controller
const ItemCtlr = (function(){
    // Item Constructor
    const item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // Data Structure / State
    const data = {
        items: StorageCtrl.getItemsFromStorage(),
        currentItem: null,
        totalCalories: 0
    }
    
    return{
        getItems: function(){
            return data.items;
        },

        addItem: function(name, calories){
            // create ID
            let ID;
            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1;
            }
            else{
                ID = 0;
            }

            calories = parseInt(calories);

            newItem = new item(ID, name, calories);

            data.items.push(newItem);

            return newItem;
        },

        getCurrentItem: function(){
            return data.currentItem;
        },

        getTotalCalories: function(){
            let total = 0;

            data.items.forEach(function(item){
                total += item.calories;
            });

            data.totalCalories = total;

            return data.totalCalories;
        },

        deleteItem: function(id){
            const ids = data.items.map(function(item){
                return item.id;
            });

            const index = ids.indexOf(id);

            data.items.splice(index, 1);
        },

        clearAllItems: function(){
            data.items = [];
        },

        updateItem: function(name, calories){
            calories = parseInt(calories);
            let found = null;

            data.items.forEach(function(item){
                if(item.id === data.currentItem.id){
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            })
            return found;
        },

        getItemByID: function(id){
            let found = null;
            data.items.forEach(function(item){
                if(item.id === id){
                    found = item;
                }
            });
            return found;
        },

        setCurrentItem: function(item){
            data.currentItem = item;
        },

        logData: function(){
            return data;
        }
    }
})();





// UI Controller
const UICtlr = (function(){

    const UISelectors = {
        itemList: '#item-list',
        listItems: '#item-list li',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearBtn: '.clear-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories',
    }

    return{
        populateItemsList: function(items){
            let html = '';

            items.forEach(function(item){
                html += `
            <li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
            </li>
            `
            });

            //Insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },

        getItemInput: function(){
            return {
                name: document.querySelector(UISelectors.itemNameInput).value, 
                calories: document.querySelector(UISelectors.itemCaloriesInput).value,
            }
        },

        addListItem: function(item){

            document.querySelector(UISelectors.itemList).style.display = 'block';
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.id = `item-${item.id}`;
            li.innerHTML = `
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
            `

            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },

        updateListItem: function(item){
            let listItems = document.querySelectorAll(UISelectors.listItems);

            listItems = Array.from(listItems);
            listItems.forEach(function(listItem){
                const itemID = listItem.getAttribute('id');
                if(itemID === `item-${item.id}`){
                    document.querySelector(`#${itemID}`).innerHTML = `
                    <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
                    `
                };
            });
        },

        removeItems: function(){
            let listItems = document.querySelectorAll(UICtlr.listItems);

            listItems = Array.from(listItems);

            listItems.forEach(function(item){
                item.remove();
            });
        },

        deleteListItem: function(id){
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();

        },

        clearInput: function(){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },

        addItemToForm: function(){
            document.querySelector(UISelectors.itemNameInput).value = ItemCtlr.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtlr.getCurrentItem().calories;
            UICtlr.showEditState();
        },

        hideList: function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },

        showTotalCalories: function(totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },

        showEditState: function(){
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },

        clearEditState: function(){
            UICtlr.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'block';
        },

        getSelectors: function(){
            return UISelectors;
        }
    }
})();





// App Controller
const App = (function(ItemCtlr, StorageCtrl, UICtlr){

    // Load Event Listeners
    const loadEventListeners = function(){
        const UISelectors = UICtlr.getSelectors();

        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
        document.addEventListener('keypress', function(e){
            if(e.keyCode == 13 || e.which == 13){
                e.preventDefault();
                return false;
            }
        })
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtlr.clear);
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
    }

    // Add item submit
    const itemAddSubmit = function(e){
        e.preventDefault();

        const input = UICtlr.getItemInput();

        if(input.name !== '' && input.calories !== ''){
            const newItem = ItemCtlr.addItem(input.name, input.calories);
            UICtlr.addListItem(newItem);

            const totalCalories = ItemCtlr.getTotalCalories();
            UICtlr.showTotalCalories(totalCalories);

            StorageCtrl.storeItem(newItem);

            UICtlr.clearInput();
        }

    };

    const itemEditClick = function(e){
        e.preventDefault();
        if(e.target.classList.contains('edit-item')){
            const listID = e.target.parentNode.parentNode.id;
            const listIDArr = listID.split('-');
            const id = parseInt(listIDArr[1]);

            const itemToEdit = ItemCtlr.getItemByID(id);

            ItemCtlr.setCurrentItem(itemToEdit);

            UICtlr.addItemToForm();
        }
    };

    const itemUpdateSubmit = function(e){
        e.preventDefault();

        const input = UICtlr.getItemInput();

        const updatedItem = ItemCtlr.updateItem(input.name, input.calories);

        const totalCalories = ItemCtlr.getTotalCalories();
        UICtlr.showTotalCalories(totalCalories);
        StorageCtrl.updateItemStorage(updatedItem);
        UICtlr.clearEditState();
        UICtlr.updateListItem(updatedItem);
    };

    const itemDeleteSubmit = function(e){
        const currentItem = ItemCtlr.getCurrentItem();

        ItemCtlr.deleteItem(currentItem.id);

        UICtlr.deleteListItem(currentItem.id);

        const totalCalories = ItemCtlr.getTotalCalories();
        UICtlr.showTotalCalories(totalCalories);

        StorageCtrl.deleteItemFromStorage(currentItem.id);
        UICtlr.clearEditState();


        e.preventDefault();
    };

    const clearAllItemsClick = function(){
        ItemCtlr.clearAllItems();

        const totalCalories = ItemCtlr.getTotalCalories();
        UICtlr.showTotalCalories(totalCalories);
        UICtlr.clearEditState();
        StorageCtrl.clearItemsFromStorage();
        UICtlr.hideList();

        UICtlr.removeItems();
    };

    return{
        init: function(){
            UICtlr.clearEditState();

            //Fetch items from data structure.
            const items = ItemCtlr.getItems();
            if(items.length === 0){
                UICtlr.hideList();
            }
            else{
                //Populate list with items
                UICtlr.populateItemsList(items);
            }

            const totalCalories = ItemCtlr.getTotalCalories();
            UICtlr.showTotalCalories(totalCalories);


            loadEventListeners();            
        }
    }
    
})(ItemCtlr, StorageCtrl, UICtlr);

App.init();