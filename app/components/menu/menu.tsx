import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";

const Menu = async () => {
  const client = createClient();
  const menu = await client.getSingle("menu");

  return (
    <nav className="bg-white shadow-md p-4 fixed top-0 left-0 w-full z-50">
      <ul className="flex space-x-6">
        {menu.data.menuitems.map((item, index) => (
          <li key={index} className="relative group">
            <PrismicNextLink
              field={item.link}
              className="text-gray-800 hover:text-blue-500 transition duration-200 font-medium"
            >
            </PrismicNextLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
