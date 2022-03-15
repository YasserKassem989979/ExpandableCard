# expandablecard

A simple and animated expandable card for React Native.


Example             
:-------------------------:
(demo/demo.gif)

## Installation

```
npm i expandablecard
```

## Usage

```
import ExpandableCard from 'expandablecard';
```

```
<View style={{flex: 1}}>
            <ExpandableCard
                title='test card one'
                expanded>
                <View style={{ height: 200, width: 200, backgroundColor: 'red' }}>
                </View>
            </ExpandableCard>
            <ExpandableCard
                title='test card two'
                expanded={false}
                contentContainerStyle={{ alignItems: 'center' }}>
                <View style={{}}>
                    <Image
                        style={{ height: 150, width: 200 }}
                        source={{ uri: 'https://cars.usnews.com/static/images/Auto/custom/14737/2022_Acura_ILX_1.jpg' }} />
                </View>
            </ExpandableCard>
            <ExpandableCard
                title='test card three'
                expanded>
                <View style={{ height: 300, width: 200, backgroundColor: 'orange' }}>
                </View>
            </ExpandableCard>
</View>
```

## Documentation

### Props
| Name                      | Description                              | Default     | Type    |
|---------------------------|------------------------------------------|-------------|---------|
| expanded                  | Whether to expand the card or not        | true        | Boolean |
| animationDuration         | Duration of animation in milliseconds    | 300         | Number  |
| iconSize                  | size on indicator                        | 24          | Number  |
| title                     | header title                             | ''          | String  |
| activeOpacity             | the opacity of header view when touch    | 0.8         | Number  |
| indicator                 | indicator component to render            | null        | component  |
| headerStyle               | style for header                         | null        | ViewStyle  |
| contentContainerStyle     | style for content wrapper                | null        | ViewStyle  |
| containerStyle            | style for card Wrapper                   | null        | ViewStyle |

## Author
Yasser Kassem

