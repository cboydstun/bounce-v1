import React, { useState, useMemo } from 'react';
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
const PINK_BOUNCE = "../satx-bounce-house-rental-san-antonio-pink-bounce.jpg"
const BALLOON_BOUNCE = "../satx-bounce-house-rental-san-antonio-balloon-bounce.png"
const BALLOON_COMBO = "../satx-bounce-house-rental-san-antonio-balloon-combo.jpg"
const BASKETBALL_SHOOT = "../satx-bounce-house-rental-san-antonio-basketball-shoot.png"
const MINI_BOUNCE = "../satx-bounce-house-rental-san-antonio-mini-bounce.jpg"
const TABLES_CHAIRS = "../satx-bounce-house-rental-san-antonio-tables-and-chairs.jpg"

export default function Inventory() {
    const [sortAscending, setSortAscending] = useState(false);
    const [filter, setFilter] = useState('DRY');

    const items = [
        { id: 1, name: 'Castle with Slide', size: '25 x 15', price: 224.95, tag: "DRY", imgUrl: DRY_XL, url: "/rentals/castle-with-slide" },
        { id: 2, name: 'Large Castle', size: '15 x 15', price: 199.95, tag: "DRY", imgUrl: DRY_LARGE, url: "/rentals/large-castle" },
        { id: 3, name: 'Medium Castle', size: '13 x 13', price: 174.95, tag: "DRY", imgUrl: DRY_MED, url: "/rentals/medium-castle" },
        { id: 4, name: 'Junior Bounce', size: '19 x 12', price: 149.95, tag: ["DRY", "WET"], imgUrl: JUNIOR_BOUNCE, url: "/rentals/junior-bounce" },
        { id: 5, name: 'Junior Waterslide', size: '16 x 8', price: 149.95, tag: "WET", imgUrl: JUNIOR_WATERSLIDE, url: "/rentals/junior-waterslide" },
        { id: 6, name: 'Lime Water Slide', size: '30 x 10', price: 224.95, tag: "WET", imgUrl: WET_XL, url: "/rentals/lime-waterslide" },
        { id: 7, name: 'Red Water Slide', size: '20 x 15', price: 274.95, tag: "WET", imgUrl: WET_RED_SLIDE, url: "/rentals/red-waterslide" },
        { id: 8, name: 'Obstacle Course', size: '40 x 20', price: 249.95, tag: ["DRY", "WET"], imgUrl: OBSTACLE_COURSE, url: "/rentals/obstacle-course" },
        { id: 9, name: 'Arch Bounce', size: '15 x 15', price: 199.95, tag: "DRY", imgUrl: ARCH_CASTLE, url: "/rentals/arch-bounce" },
        { id: 10, name: 'Pink Bounce', size: '15 x 15', price: 199.95, tag: "DRY", imgUrl: PINK_BOUNCE, url: "/rentals/pink-bounce" },
        { id: 11, name: 'Balloon Bounce', size: '15 x 15', price: 199.95, tag: "DRY", imgUrl: BALLOON_BOUNCE, url: "/rentals/balloon-bounce" },
        { id: 12, name: 'Balloon with Slide', size: '20 x 20', price: 224.95, tag: "DRY", imgUrl: BALLOON_COMBO, url: "/rentals/balloon-with-slide" },
        { id: 13, name: 'Basketball Shoot', size: '8 x 6', price: 49.95, tag: "DRY", imgUrl: BASKETBALL_SHOOT, url: "/rentals/basketball-shoot" },
        { id: 14, name: 'Mini Bounce', size: '6 x 6', price: 49.95, tag: ["DRY", "WET"], imgUrl: MINI_BOUNCE, url: "/rentals/mini-bounce" },
        { id: 15, name: 'Tables and Chairs', size: '1 table / 6 chairs', tag: ["DRY", "WET"], price: 19.95, imgUrl: TABLES_CHAIRS, url: "/rentals/tables-chairs" },
    ];

    const sortedAndFilteredItems = useMemo(() => {
        let filteredItems = items;

        // Filter items that contain the selected tag
        if (filter !== 'ALL') {
            filteredItems = items.filter(item => item.tag.includes(filter));
        }

        // Sort the filtered items by price
        return filteredItems.sort((a, b) => sortAscending ? a.price - b.price : b.price - a.price);
    }, [sortAscending, items, filter]);

    const toggleSortOrder = () => {
        setSortAscending(!sortAscending);
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    return (
        <div className="inventory-component" id='inventory-component'>
            <h2>Our Inventory</h2>
            <div className='button-container'>
                <button onClick={toggleSortOrder}>
                    Sort by Price: {sortAscending ? '↑' : '↓'}
                </button>
                <button onClick={() => handleFilterChange('ALL')} className={filter === 'ALL' ? 'active' : ''}>
                    ALL
                </button>
                <button onClick={() => handleFilterChange('DRY')} className={filter === 'DRY' ? 'active' : ''}>
                    DRY
                </button>
                <button onClick={() => handleFilterChange('WET')} className={filter === 'WET' ? 'active' : ''}>
                    WET
                </button>
            </div>

            <div className="inventory-grid">
                {sortedAndFilteredItems.map((item) => (
                    <div key={item.id} className="item-card">
                        <img src={item.imgUrl} alt={item.name} height={100} width={100} />
                        <h3>{item.name}</h3>
                        <p>{item.size}</p>
                        <p>Price: ${item.price} per day</p>
                        <button><a href='#contact-form'>Contact Now</a></button>
                    </div>
                ))}
            </div>
        </div>
    );
}