import React, { Component } from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  ViewProps
} from "react-native";
import RNHeader from "./RNHeader";
import Error from "./Error";
import Loading from "./Loading";
import { colors } from "@app/constants/Theme";
import { BarIndicator } from "react-native-indicators";
import { ImageBackground } from "react-native";
import R from "@app/assets/R";
import FastImg from "./FastImage";

interface Props {
  /**
   * View hiển thị
   */
  renderView: JSX.Element;
  /**
   * State hiện thị màn hình Loading
   */
  isLoading?: boolean;
  /**
   * State hiện thị màn hình Lỗi
   */
  isError?: object | boolean;
  /**
   * Có nút back
   */
  back?: boolean;
  /**
   * View nút phải
   */
  rightComponent?: JSX.Element;
  /**
   * View nút trái
   */
  leftComponent?: JSX.Element;
  /**
   * Title thanh header
   */
  titleHeader?: string;

  reload?: () => void;

  onBack?: () => void;

  header?: JSX.Element;

  dialogLoading?: boolean;
  isSafeAre?: boolean;
}

export default class ScreenComponent extends Component<Props, ViewProps> {
  constructor(props) {
    super(props);
  }
  renderBody() {
    const { isLoading, isError, reload, renderView } = this.props;
    if (isLoading) return <Loading />;
    if (isError) return <Error reload={reload} />;
    return renderView;
  }

  render() {
    const {
      titleHeader,
      rightComponent,
      leftComponent,
      back,
      dialogLoading,
      onBack,
      header,
      isSafeAre = true
    } = this.props;
    return (
      <View
        style={{ flex: 1 }}
        children={
          <FastImg
            source={R.images.img_bg}
            style={{
              flex: 1
            }}
            tintColor="#8b62a866"
            resizeMode="cover"
          >
            {!!titleHeader && (
              <RNHeader
                titleHeader={titleHeader}
                back={back}
                onBack={onBack}
                rightComponent={rightComponent}
                leftComponent={leftComponent}
              />
            )}
            {!!header && (
              <View
                style={{
                  paddingTop: Platform.OS == "ios" ? 30 : 10,
                  backgroundColor: colors.primary
                }}
                children={header}
              />
            )}
            <StatusBar translucent />
            {isSafeAre ? (
              <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }} children={this.renderBody()} />
              </SafeAreaView>
            ) : (
              <View style={{ flex: 1 }} children={this.renderBody()} />
            )}
            {dialogLoading && (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  elevation: Platform.OS == "android" ? 4 : 0
                }}
              >
                <View
                  style={{
                    height: 140,
                    backgroundColor: "white",
                    padding: 30,
                    borderRadius: 10
                  }}
                >
                  <BarIndicator color={colors.indicator} />
                  <Text
                    style={{
                      color: colors.indicator
                    }}
                  >
                    {"Loading"}
                  </Text>
                </View>
              </View>
            )}
          </FastImg>
        }
      />
    );
  }
}
