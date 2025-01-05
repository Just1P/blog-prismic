import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";

const Menu = async () => {
  const client = createClient();
  const menu = await client.getSingle("menu");

  return (
    <nav className="bg-white shadow-md p-4">
      <ul className="flex space-x-6">
        {menu.data.menuitems.map((item: any, index: number) => (
          <li key={index} className="relative group">
            <PrismicNextLink
              field={item.link}
              className="text-gray-800 hover:text-blue-500 transition duration-200 font-medium"
            >
              {item.label}
            </PrismicNextLink>
            {/* Sous-menu (si présent) */}
            {item.sublinks && item.sublinks.length > 0 && (
              <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transition duration-300">
                {item.sublinks.map((subitem: any, subIndex: number) => (
                  <li key={subIndex} className="border-b last:border-b-0">
                    <PrismicNextLink
                      field={subitem.link}
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white transition duration-200"
                    >
                      {subitem.label}
                    </PrismicNextLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
