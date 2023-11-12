import { useNavigate } from "react-router-dom";
import { Button } from "antd";

function AdminHeader(props) {
  const { isShowSidebar, setIsShowSidebar } = props;

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="header-logo">
        <Button
          type="primary"
          width="100px"
          onClick={() => setIsShowSidebar(!isShowSidebar)}
        >
          Menu
        </Button>
      </div>
      <div>
        <Button onClick={() => handleLogout()}>Logout</Button>
      </div>
    </div>
  );
}

export default AdminHeader;
