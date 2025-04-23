import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Menu, Sun, Moon, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [theme, setTheme] = useState("light");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users/profile", { withCredentials: true });
        setUser(response.data);
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
        setUser(null);
      }
    };
  
    checkAuthStatus();
  
    // Run check when navigating between pages
    window.addEventListener("focus", checkAuthStatus);
  
    return () => {
      window.removeEventListener("focus", checkAuthStatus);
    };
  }, []);
  

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/users/logout", { withCredentials: true });
      setIsLoggedIn(false);
      setUser(null);
      navigate("/login"); // Redirect to login page after logout
      window.location.reload(); // Clear any cached state
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-white">CarRental</h1>

        <div className="hidden md:flex items-center border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 w-72">
          <Search className="w-5 h-5 text-gray-500 dark:text-gray-300" />
          <Input 
            type="text" 
            placeholder="Search cars..." 
            className="border-none focus:ring-0 focus:outline-none bg-transparent px-2 w-full"
          />
        </div>

        <nav className="hidden md:flex gap-6">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-6">
              <NavigationMenuItem>
                <NavigationMenuLink href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition">
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/cars" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition">
                  Cars
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition">
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition">
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={toggleTheme}>
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>

          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/user.jpg" alt="User" />
                <AvatarFallback>{user?.firstname?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button variant="outline" onClick={() => navigate("/signup")}>
                Signup
              </Button>
            </div>
          )}

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
