import * as React from "react";
import { ScrollView as RNScrollView, ScrollViewProps } from "react-native";

const ScrollView = React.forwardRef<RNScrollView, ScrollViewProps>(
  ({ contentContainerStyle, ...props }, ref) => (
    <RNScrollView
      ref={ref}
      contentContainerStyle={[{ padding: 20 }, contentContainerStyle]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      {...props}
    />
  )
);

ScrollView.displayName = "ScrollView";

export { ScrollView };
