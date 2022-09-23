
import { SideNavigation } from "../components";
import linksUnlog from "../constants/routes/nav-links-unlog";
import linksUserlog from "../constants/routes/nav-links-Userlog";
import linksAdminlog from "../constants/routes/nav-links-Adminlog";


const SideNavigationContainer = (
  {
  sideNavShown,
  setSideNavShown,
  sideNavHidden,
  setSideNavHidden,
 
}

) => {
  const Admin = localStorage.getItem("isAdmin");
  const LoggedIn = localStorage.getItem("isLoggedIn");

  const logout=()=>{
    const logout=window.confirm("Do you want log out")
      if (logout) {

        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.setItem("isLoggedIn", false);
        localStorage.setItem("isAdmin", false);

        window.location.reload(true);
      } 

  }

  return (
    <SideNavigation shown={sideNavShown} hidden={sideNavHidden}>
      <SideNavigation.Container>
        <SideNavigation.Cross>
          <SideNavigation.Icon
            name="fas fa-times"
            onClick={() => {
              setSideNavHidden(true);
              setSideNavShown(false);
            }}
          />
        </SideNavigation.Cross>
        <SideNavigation.Header>
          <SideNavigation.Title>Prime Home</SideNavigation.Title>
          <SideNavigation.Text>The Home You Deserve</SideNavigation.Text>
        </SideNavigation.Header>

        <SideNavigation.Links>
         {LoggedIn === "true"? (

         <SideNavigation.List  >
           {Admin === "true"?(
           <SideNavigation.List  >
            {linksAdminlog.map((link) => (
              <SideNavigation.ListItem key={link.to}>
                <SideNavigation.Anchor to={link.to}>
                  {link.name}
                </SideNavigation.Anchor>
              </SideNavigation.ListItem>
            ))}

             <SideNavigation.ListItem>
              <SideNavigation.Anchor onClick={logout}>
                Logout
              </SideNavigation.Anchor>
            </SideNavigation.ListItem>

            <SideNavigation.ListItem>
              <SideNavigation.Anchor to="/dashboard">
                Dashboard
              </SideNavigation.Anchor>
            </SideNavigation.ListItem>
          </SideNavigation.List>):(
            <SideNavigation.List  >
            {linksUserlog.map((link) => (
              <SideNavigation.ListItem key={link.to}>
                <SideNavigation.Anchor to={link.to}>
                  {link.name}
                </SideNavigation.Anchor>
              </SideNavigation.ListItem>
            ))}

            <SideNavigation.ListItem>
              <SideNavigation.Anchor onClick={logout}>
                Logout
              </SideNavigation.Anchor>
            </SideNavigation.ListItem>

            <SideNavigation.ListItem>
              <SideNavigation.Anchor to="/profile">
                My Profile
              </SideNavigation.Anchor>
            </SideNavigation.ListItem>
          </SideNavigation.List>
          )}
          </SideNavigation.List>)
          :(
            <SideNavigation.List  >
            {linksUnlog.map((link) => (
              <SideNavigation.ListItem key={link.to}>
                <SideNavigation.Anchor to={link.to}>
                  {link.name}
                </SideNavigation.Anchor>
              </SideNavigation.ListItem>
            ))}
           
          </SideNavigation.List> 
          )} 
        </SideNavigation.Links>
      </SideNavigation.Container>
    </SideNavigation>
  );
};

export default SideNavigationContainer;
