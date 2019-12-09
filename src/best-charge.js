var selectedItems = ["ITEM0013 x 4", "ITEM0022 x 1"];
console.log(bestCharge(selectedItems));

function bestCharge(selectedItems) {
  var itemArr = listItemDetails(selectedItems);
  var discountedPrice = minPrice(itemArr);
  return printReceipt(itemArr, discountedPrice);
}

function listItemDetails(array) {
  return array.map(function (element) {
    var splited = element.split(" x ");
    var itemList = loadAllItems();
    return itemList.reduce(function (prev, curr) {
      if (curr.id === splited[0]) {
        curr.count = Number(splited[1]);
        return prev = curr;
      }
      return prev;
    }, {});
  })
}

function calculateCharge(array) {
  return array.reduce(function (prev, curr) {
    return prev += curr.price * curr.count;
  }, 0);
}

function calculateChargeAfterPromotion(num, array) {
  var itemObj = {
    charge: num,
    items: loadPromotions()[1].items,
    promotion1: function () {
      return this.charge - ~~(this.charge / 30) * 6;
    },
    promotion2: function (array) {
      return array.reduce(function (prev, curr) {
        var currCharge = curr.price * curr.count;
        if (itemObj.items.includes(curr.id)) {
          currCharge = currCharge / 2;
        }
        return prev += currCharge;
      }, 0);
    }
  }
  var chargeArr = [];
  return chargeArr.concat(itemObj.promotion1(), itemObj.promotion2(array));
}

function minPrice(itemArr) {
  var charge = calculateCharge(itemArr);
  var promotionPrice = calculateChargeAfterPromotion(charge, itemArr);
  var minPrice = charge;
  var minPromotionType = "";
  var saveMoney = "";
  promotionPrice.forEach(function (element, index) {
    if (element < minPrice) {
      minPrice = element;
      minPromotionType = loadPromotions()[index].type;
      saveMoney = charge - minPrice;
    }
  });
  var result = {};
  result.price = minPrice;
  result.type = minPromotionType;
  result.save = saveMoney;
  return result;
}

function printReceipt(itemArray, priceObj) {
  var receipt = "============= 订餐明细 =============\n";
  for (var i = 0; i < itemArray.length; i++) {
    receipt += itemArray[i].name + " x " + itemArray[i].count 
             + " = " + itemArray[i].price * itemArray[i].count + "元\n";
  }
  receipt += "-----------------------------------\n"
  if (priceObj.type) {
    receipt += "使用优惠：\n" + priceObj.type
      + "，省" + priceObj.save + "元\n"
      + "-----------------------------------\n";
  }
  receipt += "总计：" + priceObj.price + "元\n" + "===================================";
  return receipt;
}

function loadAllItems() {
  return [{
    id: 'ITEM0001',
    name: '黄焖鸡',
    price: 18.00
  }, {
    id: 'ITEM0013',
    name: '肉夹馍',
    price: 6.00
  }, {
    id: 'ITEM0022',
    name: '凉皮',
    price: 8.00
  }, {
    id: 'ITEM0030',
    name: '冰锋',
    price: 2.00
  }];
}

function loadPromotions() {
  var promotionList = [{
    type: '满30减6元'
  }, {
    type: '指定菜品半价',
    items: ['ITEM0001', 'ITEM0022']
  }];
  var discountedItemId = promotionList[1].items;
  var discountedItemName = discountedItemId.map(function (element) {
    for (var i = 0; i < loadAllItems().length; i++) {
      if (loadAllItems()[i].id === element) {
        element = loadAllItems()[i].name;
      }
    }
    return element;
  })
  promotionList[1].type += "(" + discountedItemName + ")";
  return promotionList;
}

//[done]用户输入的数据,在菜品价目表中找出价格等，每个item以object形式存放, 加入count，结果存为数组
//[provided]菜品价目列表--loadAllItems()，无需argument，输出数组
//[done]优惠列表--loadPromotions(),type里面的内容根据id列出具体打折的商品，无需argument，输出数组
//[done]计算输入item的价格charge数字：calculateCharge，输入是array，输出是number
//[done]计算优惠：各种优惠价格都算出来放在一个数组promotionPrice，输入有number的总价，array的菜品itemArr(itemArr[i]是object);输出的是包含各种优惠价格的数组；
//[done]在promotionPrice中比较优惠价格大小，函数minPrice，输出最小的价格以及优惠类型的object；
//[done]按格式指定清单，输入arguments包括菜品array，minPrice中得到的价格obejct，输出字符串；
//[done]打印清单