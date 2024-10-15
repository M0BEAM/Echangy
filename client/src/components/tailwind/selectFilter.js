import React  from 'react';
import { AiFillFilter } from 'react-icons/ai';
import Pays from '../hooks/pays';
const allPays = [
  "Tout","Ariana", "Béja", "Ben Arous", "Bizerte", "Gabès", "Gafsa", "Jendouba",
  "Kairouan", "Kasserine", "Kébili", "Le Kef", "Mahdia", "La Manouba", "Médenine",
  "Monastir", "Nabeul", "Sfax", "Sidi Bouzid", "Siliana", "Sousse", "Tataouine", "Tozeur",
  "Tunis", "Zaghouan"
]
const SelectFilter = ({setSelectedPays,options}) => {
const {isOpen, setIsOpen} = options
  const pays = Pays()
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
const handeleClick = (item) => {
//console.log(item)
let indexOfPays = pays.indexOf(item)

setSelectedPays(allPays[indexOfPays])
setIsOpen(false)
}
  return (
    <div className="relative text-left flex flex-col mt-2  items-end" >
      <div>
        <span
          onClick={toggleDropdown}
          type="button"
          className={`inline-flex justify-center  w-full  text-sm font-medium border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500`}
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          <AiFillFilter size={25} className={`${isOpen?"text-blue-900":"text-black"}`} />
        </span>
      </div>

      {isOpen && (
        <div
          className="origin-top-right overflow-y-scroll  absolute right-0 mt-10 z-50 w-48 max-h-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {pays.map((item,index) => (
              <a key={index}
               onClick={()=>handeleClick(item)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white"
                role="menuitem"
              >
               {item}
              </a>
            ))}


          </div>
        </div>
      )}
    </div>
  );
};

export default SelectFilter;
