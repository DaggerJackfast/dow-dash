import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import Container from "../Container";
import ProfileDropdown from "./ProfileDropdown";

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <header className="py-4 bg-slate-700">
      <Container>
        <div className="flex justify-between border-bottom align-center content-center">
          <div className="flex">
            <a className="text-white flex self-center" href="/">
              Dow Dash
            </a>
          </div>
          {user && <ProfileDropdown user={user} logout={logout} />}
        </div>
      </Container>
    </header>
  );
};
export default Header;
