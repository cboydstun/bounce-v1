import React from 'react';
import './Inventory.css';

const DRY_XL = "../satx-bounce-house-rental-san-antonio-dry-xl.jpg"
const DRY_LARGE = "../satx-bounce-house-rental-san-antonio-dry-large.jpg"
const DRY_MED = "../satx-bounce-house-rental-san-antonio-dry-med.jpg"
const DRY_PRINCESS = "../satx-bounce-house-rental-san-antonio-dry-princess.jpg"
const WET_XL = "../satx-bounce-house-rental-san-antonio-wet-xl.jpg"
const WET_MED = "../satx-bounce-house-rental-san-antonio-wet-med.jpg"
const GENERATOR = "../satx-bounce-house-rental-san-antonio-generator.png"
const TABLES_CHAIRS = "../satx-bounce-house-rental-san-antonio-tables-and-chairs.jpg"
const POPCORN_MAKER = "../satx-bounce-house-rental-san-antonio-popcorn-maker.jpg"
const COTTON_CANDY = "../satx-bounce-house-rental-san-antonio-cotton-candy-maker.jpg"
const SNOW_CONE = "../satx-bounce-house-rental-san-antonio-snow-cone-machine.png"
const WET_RED_SLIDE = "/satx-bounce-house-rental-san-antonio-wet-xl-red.jpg"
const OBSTACLE_COURSE = "/satx-bounce-house-rental-san-antonio-obstacle-course-2.jpg"
const PONY_RIDES = "/satx-bounce-house-rental-san-antonio-pony-rides.png"
const PETTING_ZOO = "/satx-bounce-house-rental-san-antonio-petting-zoo.png"


export default function Inventory() {
    const items = [
        { id: 1, name: 'DRY - XL Castle w Slide', size: '25 x 15', price: 300, imgUrl: DRY_XL },
        { id: 2, name: 'DRY - Large Castle', size: '15 x 15', price: 250, imgUrl: DRY_LARGE },
        { id: 3, name: 'DRY - Princess Castle', size: '14 x 14', price: 200, imgUrl: DRY_PRINCESS },
        { id: 4, name: 'DRY - Medium Castle', size: '13 x 13', price: 200, imgUrl: DRY_MED },
        { id: 5, name: 'WET - Junior Bounce', size: '19 x 12', price: 200, imgUrl: WET_MED },
        { id: 6, name: 'WET - XL Lime Water Slide', size: '30 x 10', price: 300, imgUrl: WET_XL },
        { id: 7, name: 'WET - XL Red Water Slide', size: '20 x 15', price: 325, imgUrl: WET_RED_SLIDE },
        { id: 8, name: 'WET - XL Obstacle Course', size: '40 x 20', price: 350, imgUrl: OBSTACLE_COURSE },
        { id: 9, name: 'Folding Table and Chairs', size: '6 foot table and 6 chairs', price: 20, imgUrl: TABLES_CHAIRS },
        { id: 10, name: 'Popcorn Maker', size: '50 servings', price: 50, imgUrl: POPCORN_MAKER },
        { id: 11, name: 'Cotton Candy Maker', size: '25 servings', price: 50, imgUrl: COTTON_CANDY },
        { id: 12, name: 'Snow Cone Machine', size: '50 servings', price: 50, imgUrl: SNOW_CONE },
        { id: 13, name: 'Portable Generator', size: '4000W', price: 50, imgUrl: GENERATOR },
        { id: 14, name: 'Pony Rides', size: '1 hour', price: 200, imgUrl: PONY_RIDES },
        { id: 15, name: 'Petting Zoo', size: '1 hour', price: 200, imgUrl: PETTING_ZOO },
    ];

    return (
        <div className="inventory-component" id='inventory-component'>
            <h2>Our Inventory</h2>
            <div className="inventory-grid">
                {items.map((item) => (
                    <div key={item.id} className="item-card">
                        <img src={item.imgUrl} alt={item.name} height={100} width={100} />
                        <h3>{item.name}</h3>
                        <p>{item.size}</p>
                        <p>Price: ${item.price}</p>
                        <button><a href='#contact-form'>Contact Now</a></button>
                    </div>
                ))}
            </div>
        </div>
    );
}
