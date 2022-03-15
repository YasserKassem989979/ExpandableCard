import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Animated,
  TouchableOpacity,
  Text,
  Easing,
  StyleSheet,
} from 'react-native';
import Icon from '../../assests/chevron.png';

export default class ExpandableCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: new Animated.Value(0),
      bodyHeight: props.contentHeight || 0,
      inProgress: true,
      opened: props.expanded,
      animating: false
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.expanded !== this.props.expanded) {
      this.toggle()
    }
  }

  toggle = () => {
    const { height, bodyHeight, opened } = this.state;
    const { animationDuration } = this.props;

    this.setState({ opened: !opened, animating: true }, () => {
      Animated.timing(height, {
        toValue: opened ? 0 : bodyHeight,
        duration: animationDuration,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => this.setState({ animating: false }));
    });
  };

  setBodyHeight = event => {
    const { bodyHeight, opened, inProgress, animating } = this.state;
    const { height } = event.nativeEvent.layout;

    //to detect the height of content only on mount
    // or when contentHeight prop defined
    if (bodyHeight > 0) {
      if (inProgress) {
        this.setState({ inProgress: false });
      }
      // if expanded prop is true 
      if (opened && !animating) {
        this.state.height.setValue(bodyHeight);
      }

      return;
    }

    // if expanded 
    if (opened) {
      this.state.height.setValue(height);
    }

    this.setState({ bodyHeight: height }, () => {
      this.setState({ inProgress: false });
    });
  };

  renderIndicator = () => {
    const { height, bodyHeight } = this.state;
    const { indicator, iconSize } = this.props;

    if (indicator) {
      return indicator;
    }

    const rotateIcon = height.interpolate({
      inputRange: [0, bodyHeight / 2, bodyHeight],
      outputRange: ['0deg', '90deg', '180deg']
    });

    return (
      <Animated.Image
        source={Icon}
        style={{
          transform: [
            {
              rotate: rotateIcon
            }
          ],
          width: iconSize,
          height: iconSize
        }} />
    )
  }

  render() {
    const {
      height,
      inProgress,
    } = this.state;

    const {
      title,
      children,
      headerStyle,
      contentContainerStyle,
      activeOpacity,
      containerStyle
    } = this.props;

    const bodyStyle = {};

    if (inProgress) {
      bodyStyle.position = 'absolute'
      bodyStyle.opacity = 0;
    } else {
      bodyStyle.height = height;
    }

    return (
      <View style={[
        containerStyle,
        styles.container
      ]}>
        <TouchableOpacity
          activeOpacity={activeOpacity}
          onPress={this.toggle}
          style={[
            styles.header,
            headerStyle
          ]}>
          <Text>{title}</Text>
          {this.renderIndicator()}
        </TouchableOpacity>
        <Animated.View
          onLayout={this.setBodyHeight}
          style={[
            styles.content,
            contentContainerStyle,
            bodyStyle
          ]}>
          {children}
        </Animated.View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ccc',
    minHeight: 50,
  },
  content: {
    backgroundColor: '#eee'
  }
})

ExpandableCard.propTypes = {
  expanded: PropTypes.bool,
  animationDuration: PropTypes.number,
  iconSize: PropTypes.number,
  title: PropTypes.string,
  activeOpacity: PropTypes.number,
  indicator: PropTypes.element,
  headerStyle: PropTypes.object,
  contentContainerStyle: PropTypes.object,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  contentHeight: PropTypes.number
}

ExpandableCard.defaultProps = {
  expanded: true,
  animationDuration: 300,
  iconSize: 24,
  title: '',
  activeOpacity: 0.8
};