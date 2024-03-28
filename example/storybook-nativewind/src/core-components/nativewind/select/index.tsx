import React from 'react';
import { tva } from '@gluestack-ui/nativewind-utils/tva';
import { withStates } from '@gluestack-ui/nativewind-utils/withStates';
import { withStyleContextAndStates } from '@gluestack-ui/nativewind-utils/withStyleContextAndStates';
import {
  withStyleContext,
  useStyleContext,
} from '@gluestack-ui/nativewind-utils/withStyleContext';
import type { VariantProps } from '@gluestack-ui/nativewind-utils';
import { createSelect } from '@gluestack-ui/select';
import { cssInterop } from '@gluestack-ui/nativewind-utils/cssInterop';
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
  ActionsheetScrollView,
  ActionsheetVirtualizedList,
  ActionsheetFlatList,
  ActionsheetSectionList,
  ActionsheetSectionHeaderText,
} from './select-actionsheet';

import { Pressable, View, TextInput, Platform } from 'react-native';

/** Select Components */

const selectIconStyle = tva({
  base: 'text-background-500',
  parentVariants: {
    size: {
      '2xs': 'h-3 w-3',
      'xs': 'h-3.5 w-3.5',
      'sm': 'h-4 w-4',
      'md': 'h-[18px] w-[18px]',
      'lg': 'h-5 w-5',
      'xl': 'h-6 w-6',
    },
  },
});

const selectStyle = tva({
  base: '',
  variants: {
    size: {
      xl: '',
      lg: '',
      md: '',
      sm: '',
    },
    variant: {
      underlined: '',
      outline: '',
      rounded: '',
    },
  },
});

const selectTriggerStyle = tva({
  base: 'border border-background-300 rounded flex-row items-center overflow-hidden data-[hover=true]:border-outline-400 data-[focus=true]:border-primary-700 data-[disabled=true]:opacity-40 data-[disabled=true]:data-[hover=true]:border-background-300',
  parentVariants: {
    size: {
      xl: 'h-12',
      lg: 'h-11',
      md: 'h-10',
      sm: 'h-9',
    },
    variant: {
      underlined:
        'border-0 border-b rounded-none data-[hover=true]:border-primary-700 data-[focus=true]:border-primary-700 data-[focus=true]:web:shadow-[inset_0_-1px_0_0] data-[focus=true]:web:shadow-primary-700 data-[invalid=true]:border-error-700 data-[invalid=true]:web:shadow-error-700',
      outline:
        'data-[focus=true]:border-primary-700 data-[focus=true]:web:shadow-[inset_0_0_0_1px] data-[focus=true]:data-[hover=true]:web:shadow-primary-600 data-[invalid=true]:web:shadow-[inset_0_0_0_1px] data-[invalid=true]:border-error-700 data-[invalid=true]:web:shadow-error-700 data-[invalid=true]:data-[hover=true]:border-error-700',
      rounded:
        'rounded-full data-[focus=true]:border-primary-700 data-[focus=true]:web:shadow-[inset_0_0_0_1px] data-[focus=true]:web:shadow-primary-700 data-[invalid=true]:border-error-700 data-[invalid=true]:web:shadow-error-700',
    },
  },
});

const selectInputStyle = tva({
  base: 'py-auto px-3 placeholder:text-typography-500 flex-1 web:w-full h-full text-typography-900 pointer-events-none web:outline-none',
  parentVariants: {
    size: {
      xl: 'text-xl leading-[0px]',
      lg: 'text-lg leading-[0px]',
      md: 'text-base leading-[0px]',
      sm: 'text-sm leading-[0px]',
    },
    variant: {
      underlined: 'px-0',
      outline: '',
      rounded: 'px-4',
    },
  },
});

const UISelect = createSelect(
  {
    Root:
      Platform.OS === 'web'
        ? withStyleContext(View)
        : withStyleContextAndStates(View),
    // @ts-ignore
    Trigger: Platform.OS === 'web' ? Pressable : withStates(Pressable),
    Input: TextInput,
    Icon: View,
  },
  {
    Portal: Actionsheet,
    Backdrop: ActionsheetBackdrop,
    Content: ActionsheetContent,
    DragIndicator: ActionsheetDragIndicator,
    DragIndicatorWrapper: ActionsheetDragIndicatorWrapper,
    Item: ActionsheetItem,
    ItemText: ActionsheetItemText,
    ScrollView: ActionsheetScrollView,
    VirtualizedList: ActionsheetVirtualizedList,
    FlatList: ActionsheetFlatList,
    SectionList: ActionsheetSectionList,
    SectionHeaderText: ActionsheetSectionHeaderText,
  }
);

cssInterop(UISelect, { className: 'style' });
cssInterop(UISelect.Input, { className: 'style' });
cssInterop(UISelect.Trigger, { className: 'style' });
cssInterop(UISelect.Icon, { className: 'style' });

type ISelectProps = VariantProps<typeof selectStyle> &
  React.ComponentProps<typeof UISelect>;

const Select = React.forwardRef(
  (
    {
      className,
      size = 'md',
      variant = 'outline',
      ...props
    }: ISelectProps & { className?: string },
    ref?: any
  ) => {
    return (
      <UISelect
        className={selectStyle({
          class: className,
          size,
          variant,
        })}
        ref={ref}
        context={{ size, variant }}
        {...props}
      />
    );
  }
);

type ISelectTriggerProps = VariantProps<typeof selectTriggerStyle> &
  React.ComponentProps<typeof UISelect.Trigger>;

const SelectTrigger = React.forwardRef(
  (
    { className, ...props }: ISelectTriggerProps & { className?: string },
    ref?: any
  ) => {
    const { size: parentSize, variant: parentVariant } = useStyleContext();
    return (
      <UISelect.Trigger
        className={selectTriggerStyle({
          class: className,
          parentVariants: {
            size: parentSize,
            variant: parentVariant,
          },
        })}
        ref={ref}
        {...props}
      />
    );
  }
);

type ISelectInputProps = VariantProps<typeof selectInputStyle> &
  React.ComponentProps<typeof UISelect.Input>;

const SelectInput = React.forwardRef(
  (
    { className, ...props }: ISelectInputProps & { className?: string },
    ref?: any
  ) => {
    const { size: parentSize, variant: parentVariant } = useStyleContext();
    return (
      <UISelect.Input
        className={selectInputStyle({
          class: className,
          parentVariants: {
            size: parentSize,
            variant: parentVariant,
          },
        })}
        ref={ref}
        {...props}
      />
    );
  }
);

type ISelectIcon = VariantProps<typeof selectIconStyle> &
  React.ComponentProps<typeof UISelect.Icon>;

const SelectIcon = React.forwardRef(
  (
    {
      className,
      as: AsComp,
      size,
      // @ts-ignore
      fill = 'none',
      ...props
    }: ISelectIcon & { as?: any },
    ref?: any
  ) => {
    const { size: parentSize } = useStyleContext();
    if (AsComp) {
      return (
        <View
          className={selectIconStyle({
            class: className,
            parentVariants: {
              size: parentSize,
            },
            size,
          })}
        >
          <AsComp
            height={'100%'}
            width={'100%'}
            ref={ref}
            fill={fill}
            {...props}
            //  color='red'
          />
        </View>
      );
    }
    return (
      <UISelect.Icon
        className={selectIconStyle({
          class: className,
          size,
          parentVariants: {
            size: parentSize,
          },
        })}
        ref={ref}
        fill={fill}
        {...props}
      />
    );
  }
);

Select.displayName = 'Select';
SelectTrigger.displayName = 'SelectTrigger';
SelectInput.displayName = 'SelectInput';
SelectIcon.displayName = 'SelectIcon';

// Actionsheet Components
const SelectPortal = UISelect.Portal;
const SelectBackdrop = UISelect.Backdrop;
const SelectContent = UISelect.Content;
const SelectDragIndicator = UISelect.DragIndicator;
const SelectDragIndicatorWrapper = UISelect.DragIndicatorWrapper;
const SelectItem = UISelect.Item;
const SelectItemText = UISelect.ItemText;
const SelectScrollView = UISelect.ScrollView;
const SelectVirtualizedList = UISelect.VirtualizedList;
const SelectFlatList = UISelect.FlatList;
const SelectSectionList = UISelect.SectionList;
const SelectSectionHeaderText = UISelect.SectionHeaderText;

export {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
  SelectItemText,
  SelectScrollView,
  SelectVirtualizedList,
  SelectFlatList,
  SelectSectionList,
  SelectSectionHeaderText,
};
