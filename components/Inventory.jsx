import React from 'react';
import './Inventory.css';

const DRY_XL = "../satx-bounce-house-rental-san-antonio-dry-xl.png"
const DRY_LARGE = "../satx-bounce-house-rental-san-antonio-dry-large.png"
const DRY_MED = "../satx-bounce-house-rental-san-antonio-dry-med.png"
const DRY_PRINCESS = "../satx-bounce-house-rental-san-antonio-dry-princess.png"
const WET_XL = "../satx-bounce-house-rental-san-antonio-wet-xl.png"
const WET_MED = "../satx-bounce-house-rental-san-antonio-wet-med.png"
const GENERATOR = "../satx-bounce-house-rental-san-antonio-generator.png"
const TABLES_CHAIRS = "../satx-bounce-house-rental-san-antonio-tables-and-chairs.png"
const POPCORN_MAKER = "../satx-bounce-house-rental-san-antonio-popcorn-maker.png"
const COTTON_CANDY = "../satx-bounce-house-rental-san-antonio-cotton-candy-maker.png"
const WET_RED_SLIDE = "/satx-bounce-house-rental-san-antonio-wet-xl-red.png"
const OBSTACLE_COURSE = "/satx-bounce-house-rental-san-antonio-obstacle-course.png"


export default function Inventory() {
    const items = [
        { id: 1, name: 'DRY - XL Castle w Slide', size: '25 x 15', price: 200, imgUrl: DRY_XL },
        { id: 2, name: 'DRY - Large Castle', size: '15 x 15', price: 150, imgUrl: DRY_LARGE },
        { id: 3, name: 'DRY - Medium Castle', size: '13 x 13', price: 100, imgUrl: DRY_MED },
        { id: 4, name: 'Portable Generator', size: '4000W', price: 50, imgUrl: GENERATOR },
        { id: 5, name: 'Folding Table and Chairs', size: '6 foot table and 6 chairs', price: 20, imgUrl: TABLES_CHAIRS },
        { id: 6, name: 'Popcorn Maker', size: '50 servings', price: 50, imgUrl: POPCORN_MAKER },
        { id: 7, name: 'Cotton Candy Maker', size: '25 servings', price: 50, imgUrl: COTTON_CANDY },
        { id: 8, name: 'WET - XL Lime Water Slide', size: '30 x 10', price: 200, imgUrl: WET_XL },
        { id: 9, name: 'DRY - Princess Castle', size: '13 x 13', price: 100, imgUrl: DRY_PRINCESS },
        { id: 10, name: 'WET - Junior Bounce', size: '19 x 12', price: 100, imgUrl: WET_MED },
        { id: 11, name: 'WET - XL Red Water Slide', size: '20 x 15', price: 200, imgUrl: WET_RED_SLIDE },
        { id: 12, name: 'WET - XL Obstacle Course', size: '40 x 20', price: 250, imgUrl: OBSTACLE_COURSE }
    ];

    return (
        <div className="inventory-component" id='inventory-component'>
            <h2>Our Inventory</h2>
            <div className="inventory-grid">
                {items.map((item) => (
                    <div key={item.id} className="item-card">
                        <img src={item.imgUrl} alt={item.name} height={100} width={100} />
                        <h3>{item.name}</h3>
                        <p>Inluded: {item.size}</p>
                        <p>Price: ${item.price}</p>
                        <button><a href='#contact-form'>Contact Now</a></button>
                    </div>
                ))}
            </div>
        </div>
    );
}
