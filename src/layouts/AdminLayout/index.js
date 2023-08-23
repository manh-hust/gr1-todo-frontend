import SideBarMenu from './SideBarMenu';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <SideBarMenu />
      {children}
    </div>
  );
};

export default AdminLayout;
