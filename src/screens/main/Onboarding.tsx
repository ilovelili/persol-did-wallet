import * as React from "react";
import { useTranslation } from "react-i18next";
import { Screen, Container, Button, Constants, Text } from "@kancha/kancha-ui";
import { NavigationStackProp } from "react-navigation-stack";

type Props = {
  navigation: NavigationStackProp;
};

const Onboarding: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  return (
    <Screen background={"primary"}>
      <Container alignItems={"center"} flex={1} padding>
        <Container marginTop={30}>
          <Text type={Constants.TextTypes.H2} bold>
            Get started!
          </Text>
        </Container>
        <Container marginTop={30}>
          <Text type={Constants.TextTypes.Body} textAlign={"center"}>
            Persol DID is built on uPort DAF
          </Text>
        </Container>
        <Container w={300} marginTop={30}>
          <Button
            fullWidth
            type={Constants.BrandOptions.Primary}
            block={Constants.ButtonBlocks.Filled}
            buttonText={t("Create New Identity")}
            onPress={() => navigation.navigate("CreatingWallet")}
          />
        </Container>
      </Container>
    </Screen>
  );
};

export default Onboarding;
