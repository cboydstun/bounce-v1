import React from 'react';
import './Inventory.css';

const BOUNCE13x13 = 'https://www.funasfam.com/wp-content/uploads/2023/04/large-v2.png'
const BOUNCE15x15 = 'https://www.funasfam.com/wp-content/uploads/2023/04/xlarge-v2.jpg'
const BOUNCE25x15 = 'https://www.funasfam.com/wp-content/uploads/2023/04/xxl-v2.jpg'

export default function Inventory() {
    const items = [
        { id: 1, name: 'XXL Castle w/ Slide', size: '25 x 15', price: 200, imgUrl: BOUNCE25x15 },
        { id: 2, name: 'Extra Large Castle', size: '15 x 15', price: 150, imgUrl: BOUNCE15x15 },
        { id: 3, name: 'Large Castle', size: '13 x 13', price: 100, imgUrl: BOUNCE13x13 },
        { id: 4, name: 'Portable Generator', size: '4000W', price: 100, imgUrl: 'https://a-zequipment.com/itemimages/260244.jpg' },
        { id: 5, name: 'Folding Table', size: '6 foot', price: 10, imgUrl: 'https://media.prod.bunnings.com.au/api/public/content/f9853d17594546bbbe8dd4f5c3f9c7ab?v=969478f9&t=w500dpr1' },
        { id: 6, name: 'Folding Chairs', size: '6 count', price: 10, imgUrl: 'https://www.costco.com.au/medias/sys_master/images/h87/h0f/17571170582558.jpg' },
    ];

    return (
        <div className="inventory-component">
            <h2>Our Inventory</h2>
            <div className="inventory-grid">
                {items.map((item) => (
                    <div key={item.id} className="item-card">
                        <img src={item.imgUrl} alt={item.name} height={100} width={100} />
                        <h3>{item.name}</h3>
                        <p>Size: {item.size}</p>
                        <p>Price: ${item.price}</p>
                        <button><a href='#contact-form'>Contact Now</a></button>
                    </div>
                ))}
            </div>
        </div>
    );
}
