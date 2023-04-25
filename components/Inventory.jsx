import React from 'react';
import './Inventory.css';

const BOUNCE13x13 = '../large-v2.png'
const BOUNCE15x15 = '../xlarge-v2.jpg'
const BOUNCE25x15 = '../xxl-v2.jpg'
const TABLE = '../six-foot-table.jpeg'
const CHAIRS = '../folding-chair.jpg'
const GENERATOR = '../generator.jpg'
const COMING_SOON = '../coming-soon.jpg'

export default function Inventory() {
    const items = [
        { id: 1, name: 'DRY Castle w/ Slide', size: '25 x 15', price: 200, imgUrl: BOUNCE25x15 },
        { id: 2, name: 'Extra Large Castle', size: '15 x 15', price: 150, imgUrl: BOUNCE15x15 },
        { id: 3, name: 'Large Castle', size: '13 x 13', price: 100, imgUrl: BOUNCE13x13 },
        { id: 4, name: 'Portable Generator', size: '4000W', price: 100, imgUrl: GENERATOR },
        { id: 5, name: 'Folding Table', size: '6 foot', price: 10, imgUrl: TABLE },
        { id: 6, name: 'Folding Chairs', size: '6 count', price: 10, imgUrl: CHAIRS },
        { id: 7, name: 'WET Castle w/ Slide', size: '25 x 15', price: 200, imgUrl: COMING_SOON },
        { id: 8, name: 'Princess Castle', size: '13 x 13', price: 150, imgUrl: COMING_SOON },
        { id: 9, name: 'WET Kids Bounce', size: 'TBA', price: 100, imgUrl: COMING_SOON },
        { id: 10, name: 'Popcorn Machine', size: 'TBA', price: 50, imgUrl: COMING_SOON },
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
