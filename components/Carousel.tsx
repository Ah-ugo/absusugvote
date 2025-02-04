import React, { useRef, useEffect, useState } from "react";
import { View, FlatList, Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

interface CarouselProps {
  data: any[];
  renderItem: (item: any, index: number) => JSX.Element;
  cardsPerView?: number;
  autoSlide?: boolean;
  interval?: number; // Interval time in milliseconds
}

const Carousel = ({
  data,
  renderItem,
  cardsPerView = 1,
  autoSlide = false,
  interval = 3000, // Default to 3 seconds
}: CarouselProps) => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardWidth = width / cardsPerView; // Dynamically calculate card width

  // Function to handle automatic sliding
  useEffect(() => {
    if (!autoSlide) return; // Stop auto-slide if disabled

    const slideInterval = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= data.length) nextIndex = 0; // Loop back to first item

      flatListRef.current?.scrollToOffset({
        offset: nextIndex * cardWidth,
        animated: true,
      });

      setCurrentIndex(nextIndex);
    }, interval);

    return () => clearInterval(slideInterval); // Cleanup on unmount
  }, [currentIndex, autoSlide]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth} // Snaps to the width of one card
        decelerationRate="fast"
        pagingEnabled
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / cardWidth
          );
          setCurrentIndex(index);
        }}
        renderItem={({ item, index }) => (
          <View style={[styles.card, { width: cardWidth }]}>
            {renderItem(item, index)}
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});

export default Carousel;
