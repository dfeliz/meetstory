
const CenteredContainerBase = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const LogoContainer = {
  position: "absolute",
  top: "21px",
  left: "22px"
}

export const Background = {
  width: "475px"
};

export const TopContainer = {
  ...CenteredContainerBase,
  marginTop: "33px",
};
export const MiddleContainer = {
  ...CenteredContainerBase,
  borderBottom: "1.2px solid #DADADA",
  height: "72px",
};

export const BottomContainer = {
  ...CenteredContainerBase,
  backgroundColor: "white",
  paddingTop: "29.5px",
  paddingBottom: "29.5px",
};

export const Title = {
  paddingLeft: "78px",
  src: "local('Segoe UI')",
  fontWeight: "525",
  fontStyle: "normal",
  marginTop: "29px",
  fontSize: "20px",
  color: "#707070",
};

export const Text = {
  src: "local('Segoe UI')",
  fontWeight: "525",
  fontStyle: "normal",
  fontSize: "16px",
  color: "#707070",
  paddingLeft: "0.75rem",
  margin: "0"
};
