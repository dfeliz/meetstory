const ButtonBase = {
  outline: "none",
  src: "local('Segoe UI')",
  fontWeight: "525",
  fontStyle: "normal",
  cursor: "pointer",
  borderRadius: "2rem",
  fontSize: "16px",
  border: "none",
  color: "white",
}

const CenteredContainerBase = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

export const Background = {
  width: "475px",
}

export const ButtonStyle1 = {
  ...ButtonBase,
  padding: "13.5px  106px",
  backgroundColor: "#178E74",
}

export const ButtonStyle2 = {
  ...ButtonBase,
  padding: "13.5px  116.5px",
  backgroundColor: "#1A435B",
}

export const Container1 = {
  ...CenteredContainerBase,
  marginTop: "33px",
}
export const Container2 = {
  ...CenteredContainerBase,
  borderBottom: "1.2px solid #DADADA",
}

export const Container3 = {
  ...CenteredContainerBase,
  backgroundColor: "white",
  paddingTop: "29.5px",
  paddingBottom: "29.5px",
}

export const Header1 = {
  paddingLeft: "78px",
  src: "local('Segoe UI')",
  fontWeight: "525",
  fontStyle: "normal",
  marginTop: "1.7rem",
  fontSize: "20px",
  color: "#707070",
}

export const Header2 = {
  src: "local('Segoe UI')",
  fontWeight: "525",
  fontStyle: "normal",
  fontSize: "16px",
  color: "#707070",
  marginTop: "25px",
  marginBottom: "25px"
}