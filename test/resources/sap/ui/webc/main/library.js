/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/webc/common/library","sap/ui/core/Lib","sap/ui/base/DataType","./thirdparty/Assets","./library.config"],function(e,i,a){"use strict";var n=i.init({name:"sap.ui.webc.main",apiVersion:2,version:"1.121.0",dependencies:["sap.ui.core","sap.ui.webc.common"],noLibraryCSS:true,designtime:"sap/ui/webc/main/designtime/library.designtime",interfaces:["sap.ui.webc.main.IAvatar","sap.ui.webc.main.IBreadcrumbsItem","sap.ui.webc.main.IButton","sap.ui.webc.main.ICalendarDate","sap.ui.webc.main.ICardHeader","sap.ui.webc.main.IColorPaletteItem","sap.ui.webc.main.IComboBoxItem","sap.ui.webc.main.IIcon","sap.ui.webc.main.IInput","sap.ui.webc.main.IInputSuggestionItem","sap.ui.webc.main.IListItem","sap.ui.webc.main.IMenuItem","sap.ui.webc.main.IMultiComboBoxItem","sap.ui.webc.main.ISegmentedButtonItem","sap.ui.webc.main.ISelectMenuOption","sap.ui.webc.main.ISelectOption","sap.ui.webc.main.ITab","sap.ui.webc.main.ITableCell","sap.ui.webc.main.ITableColumn","sap.ui.webc.main.ITableRow","sap.ui.webc.main.IToken","sap.ui.webc.main.IToolbarItem","sap.ui.webc.main.IToolbarSelectOption","sap.ui.webc.main.ITreeItem"],types:["sap.ui.webc.main.AvatarColorScheme","sap.ui.webc.main.AvatarGroupType","sap.ui.webc.main.AvatarShape","sap.ui.webc.main.AvatarSize","sap.ui.webc.main.BackgroundDesign","sap.ui.webc.main.BorderDesign","sap.ui.webc.main.BreadcrumbsDesign","sap.ui.webc.main.BreadcrumbsSeparatorStyle","sap.ui.webc.main.BusyIndicatorSize","sap.ui.webc.main.ButtonDesign","sap.ui.webc.main.ButtonType","sap.ui.webc.main.CalendarSelectionMode","sap.ui.webc.main.CarouselArrowsPlacement","sap.ui.webc.main.CarouselPageIndicatorStyle","sap.ui.webc.main.ComboBoxFilter","sap.ui.webc.main.HasPopup","sap.ui.webc.main.IconDesign","sap.ui.webc.main.InputType","sap.ui.webc.main.LinkDesign","sap.ui.webc.main.ListGrowingMode","sap.ui.webc.main.ListItemType","sap.ui.webc.main.ListMode","sap.ui.webc.main.ListSeparators","sap.ui.webc.main.MessageStripDesign","sap.ui.webc.main.PanelAccessibleRole","sap.ui.webc.main.PopoverHorizontalAlign","sap.ui.webc.main.PopoverPlacementType","sap.ui.webc.main.PopoverVerticalAlign","sap.ui.webc.main.PopupAccessibleRole","sap.ui.webc.main.Priority","sap.ui.webc.main.SegmentedButtonMode","sap.ui.webc.main.SemanticColor","sap.ui.webc.main.SwitchDesign","sap.ui.webc.main.TabContainerBackgroundDesign","sap.ui.webc.main.TabLayout","sap.ui.webc.main.TableColumnPopinDisplay","sap.ui.webc.main.TableGrowingMode","sap.ui.webc.main.TableMode","sap.ui.webc.main.TableRowType","sap.ui.webc.main.TabsOverflowMode","sap.ui.webc.main.TitleLevel","sap.ui.webc.main.ToastPlacement","sap.ui.webc.main.ToolbarAlign","sap.ui.webc.main.ToolbarItemOverflowBehavior","sap.ui.webc.main.WrappingType"],controls:["sap.ui.webc.main.Avatar","sap.ui.webc.main.AvatarGroup","sap.ui.webc.main.Badge","sap.ui.webc.main.Breadcrumbs","sap.ui.webc.main.BreadcrumbsItem","sap.ui.webc.main.BusyIndicator","sap.ui.webc.main.Button","sap.ui.webc.main.Calendar","sap.ui.webc.main.CalendarDate","sap.ui.webc.main.Card","sap.ui.webc.main.CardHeader","sap.ui.webc.main.Carousel","sap.ui.webc.main.CheckBox","sap.ui.webc.main.ColorPalette","sap.ui.webc.main.ColorPaletteItem","sap.ui.webc.main.ColorPalettePopover","sap.ui.webc.main.ColorPicker","sap.ui.webc.main.ComboBox","sap.ui.webc.main.ComboBoxGroupItem","sap.ui.webc.main.ComboBoxItem","sap.ui.webc.main.CustomListItem","sap.ui.webc.main.DatePicker","sap.ui.webc.main.DateRangePicker","sap.ui.webc.main.DateTimePicker","sap.ui.webc.main.Dialog","sap.ui.webc.main.FileUploader","sap.ui.webc.main.GroupHeaderListItem","sap.ui.webc.main.Icon","sap.ui.webc.main.Input","sap.ui.webc.main.Label","sap.ui.webc.main.Link","sap.ui.webc.main.List","sap.ui.webc.main.Menu","sap.ui.webc.main.MenuItem","sap.ui.webc.main.MessageStrip","sap.ui.webc.main.MultiComboBox","sap.ui.webc.main.MultiComboBoxGroupItem","sap.ui.webc.main.MultiComboBoxItem","sap.ui.webc.main.MultiInput","sap.ui.webc.main.Option","sap.ui.webc.main.Panel","sap.ui.webc.main.Popover","sap.ui.webc.main.ProgressIndicator","sap.ui.webc.main.RadioButton","sap.ui.webc.main.RangeSlider","sap.ui.webc.main.RatingIndicator","sap.ui.webc.main.ResponsivePopover","sap.ui.webc.main.SegmentedButton","sap.ui.webc.main.SegmentedButtonItem","sap.ui.webc.main.Select","sap.ui.webc.main.SelectMenu","sap.ui.webc.main.SelectMenuOption","sap.ui.webc.main.Slider","sap.ui.webc.main.SplitButton","sap.ui.webc.main.StandardListItem","sap.ui.webc.main.StepInput","sap.ui.webc.main.SuggestionGroupItem","sap.ui.webc.main.SuggestionItem","sap.ui.webc.main.Switch","sap.ui.webc.main.Tab","sap.ui.webc.main.TabContainer","sap.ui.webc.main.Table","sap.ui.webc.main.TableCell","sap.ui.webc.main.TableColumn","sap.ui.webc.main.TableGroupRow","sap.ui.webc.main.TableRow","sap.ui.webc.main.TabSeparator","sap.ui.webc.main.TextArea","sap.ui.webc.main.TimePicker","sap.ui.webc.main.Title","sap.ui.webc.main.Toast","sap.ui.webc.main.ToggleButton","sap.ui.webc.main.Token","sap.ui.webc.main.Toolbar","sap.ui.webc.main.ToolbarButton","sap.ui.webc.main.ToolbarSelect","sap.ui.webc.main.ToolbarSelectOption","sap.ui.webc.main.ToolbarSeparator","sap.ui.webc.main.ToolbarSpacer","sap.ui.webc.main.Tree","sap.ui.webc.main.TreeItem","sap.ui.webc.main.TreeItemCustom"],elements:[],extensions:{flChangeHandlers:{"sap.ui.webc.main.Avatar":{hideControl:"default",unhideControl:"default"},"sap.ui.webc.main.Badge":"sap/ui/webc/main/flexibility/Badge","sap.ui.webc.main.BreadcrumbsItem":"sap/ui/webc/main/flexibility/BreadcrumbsItem","sap.ui.webc.main.BusyIndicator":{hideControl:"default",unhideControl:"default"},"sap.ui.webc.main.Button":"sap/ui/webc/main/flexibility/Button","sap.ui.webc.main.Card":{hideControl:"default",unhideControl:"default"},"sap.ui.webc.main.Carousel":{hideControl:"default",unhideControl:"default"},"sap.ui.webc.main.CheckBox":"sap/ui/webc/main/flexibility/CheckBox","sap.ui.webc.main.CustomListItem":{hideControl:"default",unhideControl:"default",moveControls:"default"},"sap.ui.webc.main.DatePicker":{hideControl:"default",unhideControl:"default"},"sap.ui.webc.main.DateTimePicker":{hideControl:"default",unhideControl:"default"},"sap.ui.webc.main.Dialog":"sap/ui/webc/main/flexibility/Dialog","sap.ui.webc.main.Input":{hideControl:"default",unhideControl:"default"},"sap.ui.webc.main.Label":"sap/ui/webc/main/flexibility/Label","sap.ui.webc.main.Link":"sap/ui/webc/main/flexibility/Link","sap.ui.webc.main.List":"sap/ui/webc/main/flexibility/List","sap.ui.webc.main.MultiInput":{hideControl:"default",unhideControl:"default"},"sap.ui.webc.main.Panel":"sap/ui/webc/main/flexibility/Panel","sap.ui.webc.main.Popover":"sap/ui/webc/main/flexibility/Popover","sap.ui.webc.main.RadioButton":"sap/ui/webc/main/flexibility/RadioButton","sap.ui.webc.main.RangeSlider":{hideControl:"default",unhideControl:"default"},"sap.ui.webc.main.RatingIndicator":{hideControl:"default",unhideControl:"default"},"sap.ui.webc.main.ResponsivePopover":"sap/ui/webc/main/flexibility/ResponsivePopover","sap.ui.webc.main.Slider":{hideControl:"default",unhideControl:"default"},"sap.ui.webc.main.StandardListItem":"sap/ui/webc/main/flexibility/StandardListItem","sap.ui.webc.main.Tab":"sap/ui/webc/main/flexibility/Tab","sap.ui.webc.main.TabContainer":"sap/ui/webc/main/flexibility/TabContainer","sap.ui.webc.main.Table":{hideControl:"default",unhideControl:"default"},"sap.ui.webc.main.Title":"sap/ui/webc/main/flexibility/Title"}}});n.AvatarColorScheme={Accent1:"Accent1",Accent10:"Accent10",Accent2:"Accent2",Accent3:"Accent3",Accent4:"Accent4",Accent5:"Accent5",Accent6:"Accent6",Accent7:"Accent7",Accent8:"Accent8",Accent9:"Accent9",Placeholder:"Placeholder"};n.AvatarGroupType={Group:"Group",Individual:"Individual"};n.AvatarShape={Circle:"Circle",Square:"Square"};n.AvatarSize={L:"L",M:"M",S:"S",XL:"XL",XS:"XS"};n.BackgroundDesign={Solid:"Solid",Translucent:"Translucent",Transparent:"Transparent"};n.BorderDesign={None:"None",Solid:"Solid"};n.BreadcrumbsDesign={NoCurrentPage:"NoCurrentPage",Standard:"Standard"};n.BreadcrumbsSeparatorStyle={BackSlash:"BackSlash",DoubleBackSlash:"DoubleBackSlash",DoubleGreaterThan:"DoubleGreaterThan",DoubleSlash:"DoubleSlash",GreaterThan:"GreaterThan",Slash:"Slash"};n.BusyIndicatorSize={Large:"Large",Medium:"Medium",Small:"Small"};n.ButtonDesign={Attention:"Attention",Default:"Default",Emphasized:"Emphasized",Negative:"Negative",Positive:"Positive",Transparent:"Transparent"};n.ButtonType={Button:"Button",Reset:"Reset",Submit:"Submit"};n.CalendarSelectionMode={Multiple:"Multiple",Range:"Range",Single:"Single"};n.CarouselArrowsPlacement={Content:"Content",Navigation:"Navigation"};n.CarouselPageIndicatorStyle={Default:"Default",Numeric:"Numeric"};n.ComboBoxFilter={Contains:"Contains",None:"None",StartsWith:"StartsWith",StartsWithPerTerm:"StartsWithPerTerm"};n.HasPopup={Dialog:"Dialog",Grid:"Grid",ListBox:"ListBox",Menu:"Menu",Tree:"Tree"};n.IconDesign={Contrast:"Contrast",Critical:"Critical",Default:"Default",Information:"Information",Negative:"Negative",Neutral:"Neutral",NonInteractive:"NonInteractive",Positive:"Positive"};n.InputType={Email:"Email",Number:"Number",Password:"Password",Tel:"Tel",Text:"Text",URL:"URL"};n.LinkDesign={Default:"Default",Emphasized:"Emphasized",Subtle:"Subtle"};n.ListGrowingMode={Button:"Button",None:"None",Scroll:"Scroll"};n.ListItemType={Active:"Active",Detail:"Detail",Inactive:"Inactive",Navigation:"Navigation"};n.ListMode={Delete:"Delete",MultiSelect:"MultiSelect",None:"None",SingleSelect:"SingleSelect",SingleSelectAuto:"SingleSelectAuto",SingleSelectBegin:"SingleSelectBegin",SingleSelectEnd:"SingleSelectEnd"};n.ListSeparators={All:"All",Inner:"Inner",None:"None"};n.MessageStripDesign={Information:"Information",Negative:"Negative",Positive:"Positive",Warning:"Warning"};n.PanelAccessibleRole={Complementary:"Complementary",Form:"Form",Region:"Region"};n.PopoverHorizontalAlign={Center:"Center",Left:"Left",Right:"Right",Stretch:"Stretch"};n.PopoverPlacementType={Bottom:"Bottom",Left:"Left",Right:"Right",Top:"Top"};n.PopoverVerticalAlign={Bottom:"Bottom",Center:"Center",Stretch:"Stretch",Top:"Top"};n.PopupAccessibleRole={AlertDialog:"AlertDialog",Dialog:"Dialog",None:"None"};n.Priority={High:"High",Low:"Low",Medium:"Medium",None:"None"};n.SegmentedButtonMode={MultiSelect:"MultiSelect",SingleSelect:"SingleSelect"};n.SemanticColor={Critical:"Critical",Default:"Default",Negative:"Negative",Neutral:"Neutral",Positive:"Positive"};n.SwitchDesign={Graphical:"Graphical",Textual:"Textual"};n.TabContainerBackgroundDesign={Solid:"Solid",Translucent:"Translucent",Transparent:"Transparent"};n.TabLayout={Inline:"Inline",Standard:"Standard"};n.TableColumnPopinDisplay={Block:"Block",Inline:"Inline"};n.TableGrowingMode={Button:"Button",None:"None",Scroll:"Scroll"};n.TableMode={MultiSelect:"MultiSelect",None:"None",SingleSelect:"SingleSelect"};n.TableRowType={Active:"Active",Inactive:"Inactive"};n.TabsOverflowMode={End:"End",StartAndEnd:"StartAndEnd"};n.TitleLevel={H1:"H1",H2:"H2",H3:"H3",H4:"H4",H5:"H5",H6:"H6"};n.ToastPlacement={BottomCenter:"BottomCenter",BottomEnd:"BottomEnd",BottomStart:"BottomStart",MiddleCenter:"MiddleCenter",MiddleEnd:"MiddleEnd",MiddleStart:"MiddleStart",TopCenter:"TopCenter",TopEnd:"TopEnd",TopStart:"TopStart"};n.ToolbarAlign={End:"End",Start:"Start"};n.ToolbarItemOverflowBehavior={AlwaysOverflow:"AlwaysOverflow",Default:"Default",NeverOverflow:"NeverOverflow"};n.WrappingType={None:"None",Normal:"Normal"};a.registerEnum("sap.ui.webc.main.AvatarGroupType",n.AvatarGroupType);a.registerEnum("sap.ui.webc.main.AvatarColorScheme",n.AvatarColorScheme);a.registerEnum("sap.ui.webc.main.AvatarShape",n.AvatarShape);a.registerEnum("sap.ui.webc.main.AvatarSize",n.AvatarSize);a.registerEnum("sap.ui.webc.main.BackgroundDesign",n.BackgroundDesign);a.registerEnum("sap.ui.webc.main.BorderDesign",n.BorderDesign);a.registerEnum("sap.ui.webc.main.BreadcrumbsDesign",n.BreadcrumbsDesign);a.registerEnum("sap.ui.webc.main.BreadcrumbsSeparatorStyle",n.BreadcrumbsSeparatorStyle);a.registerEnum("sap.ui.webc.main.BusyIndicatorSize",n.BusyIndicatorSize);a.registerEnum("sap.ui.webc.main.ButtonDesign",n.ButtonDesign);a.registerEnum("sap.ui.webc.main.ButtonType",n.ButtonType);a.registerEnum("sap.ui.webc.main.CalendarSelectionMode",n.CalendarSelectionMode);a.registerEnum("sap.ui.webc.main.CarouselArrowsPlacement",n.CarouselArrowsPlacement);a.registerEnum("sap.ui.webc.main.CarouselPageIndicatorStyle",n.CarouselPageIndicatorStyle);a.registerEnum("sap.ui.webc.main.ComboBoxFilter",n.ComboBoxFilter);a.registerEnum("sap.ui.webc.main.HasPopup",n.HasPopup);a.registerEnum("sap.ui.webc.main.IconDesign",n.IconDesign);a.registerEnum("sap.ui.webc.main.InputType",n.InputType);a.registerEnum("sap.ui.webc.main.LinkDesign",n.LinkDesign);a.registerEnum("sap.ui.webc.main.ListGrowingMode",n.ListGrowingMode);a.registerEnum("sap.ui.webc.main.ListItemType",n.ListItemType);a.registerEnum("sap.ui.webc.main.ListMode",n.ListMode);a.registerEnum("sap.ui.webc.main.ListSeparators",n.ListSeparators);a.registerEnum("sap.ui.webc.main.MessageStripDesign",n.MessageStripDesign);a.registerEnum("sap.ui.webc.main.PanelAccessibleRole",n.PanelAccessibleRole);a.registerEnum("sap.ui.webc.main.PopoverHorizontalAlign",n.PopoverHorizontalAlign);a.registerEnum("sap.ui.webc.main.PopoverPlacementType",n.PopoverPlacementType);a.registerEnum("sap.ui.webc.main.PopoverVerticalAlign",n.PopoverVerticalAlign);a.registerEnum("sap.ui.webc.main.PopupAccessibleRole",n.PopupAccessibleRole);a.registerEnum("sap.ui.webc.main.Priority",n.Priority);a.registerEnum("sap.ui.webc.main.SegmentedButtonMode",n.SegmentedButtonMode);a.registerEnum("sap.ui.webc.main.SemanticColor",n.SemanticColor);a.registerEnum("sap.ui.webc.main.SwitchDesign",n.SwitchDesign);a.registerEnum("sap.ui.webc.main.TabContainerBackgroundDesign",n.TabContainerBackgroundDesign);a.registerEnum("sap.ui.webc.main.TabLayout",n.TabLayout);a.registerEnum("sap.ui.webc.main.TableColumnPopinDisplay",n.TableColumnPopinDisplay);a.registerEnum("sap.ui.webc.main.TableGrowingMode",n.TableGrowingMode);a.registerEnum("sap.ui.webc.main.TableMode",n.TableMode);a.registerEnum("sap.ui.webc.main.TableRowType",n.TableRowType);a.registerEnum("sap.ui.webc.main.TabsOverflowMode",n.TabsOverflowMode);a.registerEnum("sap.ui.webc.main.TitleLevel",n.TitleLevel);a.registerEnum("sap.ui.webc.main.ToastPlacement",n.ToastPlacement);a.registerEnum("sap.ui.webc.main.ToolbarAlign",n.ToolbarAlign);a.registerEnum("sap.ui.webc.main.ToolbarItemOverflowBehavior",n.ToolbarItemOverflowBehavior);a.registerEnum("sap.ui.webc.main.WrappingType",n.WrappingType);return n});
//# sourceMappingURL=library.js.map