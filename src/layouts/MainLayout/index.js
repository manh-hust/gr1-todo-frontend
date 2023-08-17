import SideBarMenu from './SideBarMenu';

const MainLayout = ({ children }) => {
  return (
    <div className="flex">
      <SideBarMenu />
      {children}
    </div>
  );
};

export default MainLayout;
