import {Col, View} from 'native-base';
import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';
import {Colors} from '../../util/Colors';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {ChartConfig} from 'react-native-chart-kit/dist/HelperTypes';
import {AbstractChartConfig} from 'react-native-chart-kit/dist/AbstractChart';
import {
  SvgXml,
  Svg,
  Rect,
  Image as SVGImage,
  Defs,
  ClipPath,
  Circle,
  Text as SVGText,
} from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';
import TitleText from '../../components/TitleText';

const WalletBg = require('../../../assets/images/walletBg.png');
const expense = require('../../../assets/images/expense.png');
const income = require('../../../assets/images/income.png');
const splishCard = require('../../../assets/images/SplishCard.png');

enum ChartMode {
  BarChart,
  Line,
}

enum ChartType {
  Day,
  Week,
  Month,
  Year,
}

interface Props {
  navigation: any;
}

const WalletScreen: React.FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor={Colors.WALLET_PURPLE}
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
      />
      <WalletUpcomingScreen />
    </SafeAreaView>
  );
};

const walletImg = require('../../../assets/images/wallet.png');

const WalletUpcomingScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={walletImg}
          style={{width: 120, height: 120}}
          resizeMethod="resize"
          resizeMode="contain"
        />
        <TitleText
          text="Wallet Coming Soon"
          styles={{fontSize: 18, fontWeight: 'normal', marginTop: 10}}
        />
      </View>
    </View>
  );
};

const WalletLoadedScreen: React.FC<Props> = ({navigation}) => {
  const windowWidth = useWindowDimensions().width;
  const [chartMode, setChartMode] = useState<ChartMode>(ChartMode.Line);
  const [chartType, setChartType] = useState<ChartType>(ChartType.Day);
  const username = 'Luxury Fit';
  const moneyWholeNumber = '1,000';
  const moneyFraction = '32';
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#FAFAFA'}}>
      <View style={{}}>
        <ImageBackground
          resizeMethod="auto"
          resizeMode="cover"
          source={WalletBg}
          style={{width: '100%'}}>
          <View style={{paddingHorizontal: 16, paddingVertical: 16}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row'}}>
                <Ionicons
                  name="sunny-outline"
                  size={24}
                  color={Colors.YELLOW}
                />
                <Text
                  style={[
                    styles.smallText,
                    {color: Colors.WHITE, fontSize: 18, fontWeight: 'bold'},
                  ]}>
                  Good Morning, {username}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('notification')}>
                <Ionicons
                  name="notifications-outline"
                  color={Colors.WHITE}
                  size={24}
                />
              </TouchableOpacity>
            </View>
            <View style={{marginVertical: 8}}>
              <Text
                style={[styles.smallText, {color: Colors.WHITE, fontSize: 18}]}>
                Your Balance is
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.smallText,
                  {
                    color: Colors.WHITE,
                    fontSize: 24,
                    fontWeight: 'bold',
                  },
                ]}>
                {moneyWholeNumber}.
                {/* <View style={{position: 'absolute', right: -0, top: 10}}> */}
                <View
                  style={{
                    position: 'absolute',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    right: -1000,
                    top: 0,
                    width: 60,
                    // height: 20,
                    // backgroundColor: Colors.GREEN,
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      right: 30,
                      top: -10,
                    }}>
                    <Text
                      style={[
                        styles.smallText,
                        {
                          color: Colors.WHITE,
                          fontSize: 24,
                          fontWeight: 'bold',
                        },
                      ]}>
                      {moneyFraction}
                    </Text>
                  </View>
                </View>
                {/* </View> */}
              </Text>
            </View>
            <View style={{marginTop: 50, flexDirection: 'row'}}>
              <View style={{width: 150, height: 40}}>
                <Button
                  iconName="add-outline"
                  iconColor="#1b1854"
                  backgroundColor={Colors.LEMON_GREEN}
                  onPress={() => navigation.navigate('fundWallet')}
                  text="Fund Wallet"
                  textColor={'#1b1854'}
                />
              </View>
              <View style={{width: 150, height: 40, marginLeft: 16}}>
                <Button
                  iconName="send-outline"
                  styles={{
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderColor: Colors.WHITE,
                    borderWidth: 1,
                  }}
                  onPress={() => navigation.navigate('sendMoney')}
                  text="Send Money"
                  textColor={Colors.WHITE}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <View
          style={{
            paddingVertical: 8,
          }}>
          <Svg height="150" width="250">
            <SVGImage
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              opacity="1"
              href={splishCard}
              // clipPath="url(#clip)"
            />
            <SVGText
              x="70%"
              y="85%"
              textAnchor="middle"
              fontWeight="bold"
              fontSize="20"
              strokeWidth="1"
              fontFamily="SFUIText-Light"
              fill="white"
              // fill="none"
              stroke="white">
              John Doe
            </SVGText>
          </Svg>
        </View>
        <TouchableOpacity>
          <View style={[styles.iconButton, {backgroundColor: '#F2F2F2'}]}>
            <Ionicons name="add-outline" color={Colors.BLUE} size={32} />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: Colors.WHITE,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          paddingTop: 16,
        }}>
        <View style={{}}>
          <View style={styles.statisticContainer}>
            <Text
              style={[
                styles.smallText,
                {
                  fontSize: 16,
                  color: Colors.BLACK,
                  fontWeight: 'bold',
                  marginBottom: 8,
                },
              ]}>
              My Statistics
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <View style={{flexDirection: 'row', marginBottom: 4}}>
                  <Image
                    source={income}
                    style={{width: 12, height: 12}}
                    resizeMethod="auto"
                    resizeMode="contain"
                  />
                  <Text style={[styles.smallText]}>Income</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={expense}
                    style={{width: 12, height: 12}}
                    resizeMethod="auto"
                    resizeMode="contain"
                  />
                  <Text style={[styles.smallText]}>Expense</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => setChartMode(ChartMode.BarChart)}>
                  <View
                    style={
                      chartMode === ChartMode.BarChart
                        ? {
                            ...styles.iconButton,
                            borderColor: Colors.BLUE,
                            borderWidth: 1,
                          }
                        : styles.iconButton
                    }>
                    <Ionicons
                      name="stats-chart-outline"
                      size={20}
                      color={
                        chartMode === ChartMode.BarChart
                          ? Colors.BLUE
                          : Colors.GRAY_1
                      }
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setChartMode(ChartMode.Line)}>
                  <View
                    style={
                      chartMode === ChartMode.Line
                        ? {
                            ...styles.iconButton,
                            borderColor: Colors.BLUE,
                            borderWidth: 1,
                          }
                        : styles.iconButton
                    }>
                    <Ionicons
                      name="analytics-outline"
                      size={20}
                      color={
                        chartMode === ChartMode.Line
                          ? Colors.BLUE
                          : Colors.GRAY_1
                      }
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 8,
                justifyContent: 'space-evenly',
              }}>
              <TouchableOpacity onPress={() => setChartType(ChartType.Day)}>
                <Text
                  style={
                    chartType === ChartType.Day
                      ? {
                          ...styles.chartTypeText,
                          color: Colors.BLACK,
                          fontWeight: '600',
                        }
                      : styles.chartTypeText
                  }>
                  Day
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setChartType(ChartType.Week)}>
                <Text
                  style={
                    chartType === ChartType.Week
                      ? {
                          ...styles.chartTypeText,
                          color: Colors.BLACK,
                          fontWeight: '600',
                        }
                      : styles.chartTypeText
                  }>
                  Week
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setChartType(ChartType.Month)}>
                <Text
                  style={
                    chartType === ChartType.Month
                      ? {
                          ...styles.chartTypeText,
                          color: Colors.BLACK,
                          fontWeight: '600',
                        }
                      : styles.chartTypeText
                  }>
                  Month
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setChartType(ChartType.Year)}>
                <Text
                  style={
                    chartType === ChartType.Year
                      ? {
                          ...styles.chartTypeText,
                          color: Colors.BLACK,
                          fontWeight: '600',
                        }
                      : styles.chartTypeText
                  }>
                  Year
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {chartMode === ChartMode.Line ? (
          <LineChart
            data={{
              labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                  color: (opacity = 1) => `${Colors.GREEN}`,
                },
                {
                  data: [
                    Math.random() * 60,
                    Math.random() * 60,
                    Math.random() * 30,
                    Math.random() * 90,
                    Math.random() * 40,
                    Math.random() * 100,
                    Math.random() * 40,
                  ],
                  color: (opacity = 1) => `${Colors.RED}`,
                },
              ],
            }}
            width={windowWidth} // from react-native
            // height={'100%'}
            height={200}
            yAxisLabel="$"
            yAxisSuffix="k"
            withInnerLines={false}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={chartConfig}
            bezier
            style={graphStyle}
          />
        ) : (
          <BarChart
            style={graphStyle}
            data={data}
            yAxisSuffix="k"
            width={windowWidth}
            height={200}
            yAxisLabel="$"
            chartConfig={chartConfig2}
            verticalLabelRotation={0}
            withInnerLines={false}
          />
        )}
      </View>
    </ScrollView>
  );
};

const data = {
  labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  datasets: [
    {
      data: [20, 45, 28, 80, 30, 43, 30],
      color: (opacity = 1) => `${Colors.GREEN}`,
    },
    {
      data: [10, 30, 40, 60, 120, 20, 30],
      color: (opacity = 1) => `${Colors.GREEN}`,
    },
  ],
};

const graphStyle: Partial<ViewStyle> = {
  marginTop: 8,
  borderRadius: 0,
  paddingBottom: 20,
};

const chartConfig2: AbstractChartConfig = {
  backgroundColor: Colors.WHITE,
  backgroundGradientFrom: `${Colors.WHITE}`,
  backgroundGradientTo: `${Colors.WHITE}`,
  barPercentage: 0.5,
  fillShadowGradient: `${Colors.GREEN}`,
  fillShadowGradientOpacity: 0.5,
  propsForBackgroundLines: {},

  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `${Colors.GREEN}`,
  labelColor: (opacity = 1) => `${Colors.GRAY_1}`,
  style: {
    borderRadius: 16,
    paddingBottom: 20,
    backgroundColor: Colors.GREEN,
  },
  //   propsForDots: {
  //     r: '4',
  //     strokeWidth: '1',
  //     stroke: '#fff',
  //   },
};

const chartConfig: ChartConfig | AbstractChartConfig | undefined = {
  backgroundColor: Colors.WHITE,
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `${Colors.GREEN}`,
  labelColor: (opacity = 1) => `${Colors.GRAY_1}`,
  style: {
    borderRadius: 16,
    paddingBottom: 20,
  },
  propsForDots: {
    r: '4',
    strokeWidth: '1',
    stroke: '#fff',
  },
};

const styles = StyleSheet.create({
  statisticContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  smallText: {
    fontFamily: 'SFUIText-Regular',
    fontSize: 10,
    color: Colors.GRAY_2,
    marginLeft: 8,
  },
  chartTypeText: {
    fontFamily: 'SFUIText-Light',
    color: Colors.GRAY_2,
    fontSize: 16,
  },
  iconButton: {
    backgroundColor: Colors.BACKGROUND_COLOR,
    width: 40,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
});

export default WalletScreen;
