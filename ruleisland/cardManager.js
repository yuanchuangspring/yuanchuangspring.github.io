//卡牌管理器

function postCard1(scene,cardData){
    cardContainer=scene.add.container(sw+200,(sh-4)/6);
    addcard=scene.add.sprite(0,0,"mapCard");
    addcard.setScale(((sh-4)/3-15)/384);
    addcard.setTint(0xD2CBA2);
    addcard.layoutType="cardBg";
    
    cardContainer.add(addcard);
    current_card[0].push(cardContainer);
    
    moveToPointX(scene,cardContainer,130+50+80*(current_card[0].length-1),1000);
}

function postCard2(scene,cardData){
    cardContainer=scene.add.container(sw+200,(sh-4)/6+(sh-4)/3+3);
    addcard=scene.add.sprite(0,0,"mapCard");
    addcard.setScale(((sh-4)/3-15)/384);
    addcard.setTint(0xD2CBA2);
    addcard.layoutType="cardBg";
    
    cardContainer.add(addcard);
    current_card[1].push(cardContainer);
    
    moveToPointX(scene,cardContainer,130+50+80*(current_card[1].length-1),1000);
}

function postCard3(scene,cardData){
    cardContainer=scene.add.container(sw+200,(sh-4)/6+((sh-4)/3+3)*2+5);
    addcard=scene.add.sprite(0,0,"mapCard");
    addcard.setScale(((sh-4)/3-15)/384);
    addcard.setTint(0xD2CBA2);
    addcard.layoutType="cardBg";
    
    cardContainer.add(addcard);
    current_card[2].push(cardContainer);
    
    moveToPointX(scene,cardContainer,130+50+80*(current_card[2].length-1),1000);
}

