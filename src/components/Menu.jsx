import React from 'react';
import { ChefHat, Coffee, Soup, Cake } from 'lucide-react';

const MenuSection = ({ title, items, icon: Icon }) => (
  <div className="mb-16">
    <div className="flex items-center gap-2 mb-6">
      <Icon className="w-6 h-6 text-neutral-600" />
      <h2 className="font-light text-2xl text-neutral-800">{title}</h2>
    </div>
    <div className="space-y-6">
      {items.map((item, index) => (
        <div key={index} className="group">
          <div className="flex justify-between items-baseline">
            <h3 className="font-light text-lg text-neutral-800 group-hover:text-neutral-600 transition-colors">
              {item.name}
            </h3>
            <div className="border-b border-dotted border-neutral-300 flex-grow mx-4"></div>
            <span className="font-light text-neutral-600">${item.price}</span>
          </div>
          <p className="text-sm text-neutral-500 mt-1 font-light">{item.description}</p>
        </div>
      ))}
    </div>
  </div>
);

const Menu = () => {
  const menuData = {
    starters: [
      {
        name: "Artisanal Bread Basket",
        price: "8",
        description: "House-made sourdough, whole grain, served with cultured butter"
      },
      {
        name: "Seasonal Soup",
        price: "12",
        description: "Chef's daily preparation using local ingredients"
      },
      {
        name: "Garden Greens",
        price: "14",
        description: "Mixed leaves, shaved vegetables, light herb vinaigrette"
      }
    ],
    mains: [
      {
        name: "Wild Caught Salmon",
        price: "32",
        description: "Pan-seared, seasonal vegetables, lemon butter sauce"
      },
      {
        name: "Heritage Grain Risotto",
        price: "26",
        description: "Locally foraged mushrooms, aged parmesan, fresh herbs"
      },
      {
        name: "Grass-Fed Beef",
        price: "38",
        description: "8oz tenderloin, root vegetables, red wine reduction"
      }
    ],
    desserts: [
      {
        name: "Dark Chocolate Tart",
        price: "12",
        description: "Single origin chocolate, sea salt, vanilla bean ice cream"
      },
      {
        name: "Seasonal Fruit Pavlova",
        price: "11",
        description: "Light meringue, whipped cream, market berries"
      },
      {
        name: "Artisanal Cheese Selection",
        price: "16",
        description: "Three local cheeses, honey, preserved fruits"
      }
    ]
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pt-32 pb-16">
      <div className="text-center mb-16">
        <h1 className="font-extralight text-4xl text-neutral-800 mb-4">Menu</h1>
        <p className="text-neutral-500 font-light">Seasonal ingredients. Simple preparation. Thoughtful dining.</p>
      </div>
      
      <MenuSection title="To Begin" items={menuData.starters} icon={Soup} />
      <MenuSection title="Main Courses" items={menuData.mains} icon={ChefHat} />
      <MenuSection title="Desserts" items={menuData.desserts} icon={Cake} />
      
      <div className="text-center mt-16">
        <p className="text-sm text-neutral-500 font-light">
          Menu items may contain or come into contact with allergens. 
          <br />Please inform our staff of any dietary requirements.
        </p>
      </div>
    </div>
  );
};

export default Menu;
