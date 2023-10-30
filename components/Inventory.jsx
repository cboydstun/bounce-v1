import React from 'react';
import './Inventory.css';

const DRY_XL = "../satx-bounce-house-rental-san-antonio-dry-xl.jpg"
const DRY_LARGE = "../satx-bounce-house-rental-san-antonio-dry-large.jpg"
const DRY_MED = "../satx-bounce-house-rental-san-antonio-dry-med.jpg"
const WET_XL = "../satx-bounce-house-rental-san-antonio-wet-xl.jpg"
const JUNIOR_BOUNCE = "../satx-bounce-house-rental-san-antonio-junior-bounce.jpg"
const JUNIOR_WATERSLIDE = "../satx-bounce-house-rental-san-antonio-junior-waterslide.jpg"
const WET_RED_SLIDE = "../satx-bounce-house-rental-san-antonio-wet-xl-red.jpg"
const OBSTACLE_COURSE = "../satx-bounce-house-rental-san-antonio-obstacle-course-2.jpg"
const ARCH_CASTLE = "../satx-bounce-house-rental-san-antonio-arch-castle.png"
const PINK_BOUNCE = "../satx-bounce-house-rental-san-antonio-pink-bounce.png"
const BALLOON_BOUNCE = "../satx-bounce-house-rental-san-antonio-balloon-bounce.png"
const BALLOON_COMBO = "../satx-bounce-house-rental-san-antonio-balloon-combo.png"
const BASKETBALL_SHOOT = "../satx-bounce-house-rental-san-antonio-basketball-shoot.png"
const MINI_BOUNCE = "../satx-bounce-house-rental-san-antonio-mini-bounce.png"
const TABLES_CHAIRS = "../satx-bounce-house-rental-san-antonio-tables-and-chairs.jpg"

export default function Inventory() {
    const items = [
        { id: 1, name: 'DRY - Castle with Slide', size: '25 x 15', price: 274.95, imgUrl: DRY_XL },
        { id: 2, name: 'DRY - Large Castle', size: '15 x 15', price: 249.95, imgUrl: DRY_LARGE },
        { id: 3, name: 'DRY - Medium Castle', size: '13 x 13', price: 224.95, imgUrl: DRY_MED },
        { id: 4, name: 'DRY - Junior Bounce', size: '19 x 12', price: 174.95, imgUrl: JUNIOR_BOUNCE },
        { id: 5, name: 'WET - Junior Waterslide', size: '16 x 8', price: 174.95, imgUrl: JUNIOR_WATERSLIDE },
        { id: 6, name: 'WET - Lime Water Slide', size: '30 x 10', price: 274.95, imgUrl: WET_XL },
        { id: 7, name: 'WET - Red Water Slide', size: '20 x 15', price: 299.95, imgUrl: WET_RED_SLIDE },
        { id: 8, name: 'DRY - Obstacle Course', size: '40 x 20', price: 299.95, imgUrl: OBSTACLE_COURSE },
        { id: 9, name: 'DRY - Arch Bounce', size: '14 x 14', price: 249.95, imgUrl: ARCH_CASTLE },
        { id: 10, name: 'DRY - Pink Bounce', size: '14 x 14', price: 224.95, imgUrl: PINK_BOUNCE },
        { id: 11, name: 'DRY - Balloon Bounce', size: '15 x 15', price: 249.95, imgUrl: BALLOON_BOUNCE },
        { id: 12, name: 'DRY - Balloon Combo', size: '20 x 15', price: 274.95, imgUrl: BALLOON_COMBO },
        { id: 13, name: 'DRY - Basketball Shoot', size: '10 x 8', price: 149.95, imgUrl: BASKETBALL_SHOOT },
        { id: 14, name: 'DRY - Mini Bounce', size: '10 x 10', price: 174.95, imgUrl: MINI_BOUNCE },
        { id: 15, name: 'Tables and Chairs', size: '1 table / 6 chairs', price: 19.95, imgUrl: TABLES_CHAIRS },
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
