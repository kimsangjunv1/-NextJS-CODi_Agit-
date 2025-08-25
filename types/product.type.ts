export interface SetMenuGroupListType {
    InUpMenus: {
        MenuGroupIdx: number;
        SortNo: number;
        MenuGroupName: string;
        IsEnabled: number;
        ContentSourceName: string;
        ArrayType: string;
    }[];
    DeleteMenus: {
        MenuGroupIdx: number;
        SortNo: number;
        MenuGroupName: string;
        IsEnabled: number;
        ContentSourceName: string;
        ArrayType: string;
    }[];
    requiredParam: {
        StoreIdx: number;
        ModDate: string;
    };
}

export interface GetProdGroupListPagingType {
    ProdKindTypeIdx: number;
    ProdType: number;
    ProdIdx: number;
    SearchText: string;
    PageSize: number;
    PageNum: number;
    requiredParam: {
        StoreIdx: number;
        ModDate: string;
    };
}

export interface SetProductType {
    StoreIdx: number;
    ProdGroupIdx: number;
    Product: {
        ImageName: string;
        KindTypeIdx: number;
        IsDisplayDescription: number;
        IsAdultOnly: number;
        NameDescList: {
            LengTypeIdx: number;
            ProdName: string;
            ProdDesc: string;
        }[];
        SalePrice: number;
        IsTaxFree: number;
        PurchasePrice: number;
        IsTakeOut: number;
        TakeOutSalePrice: number;
        UseViewDate: number;
        ViewDateStart: string;
        ViewDateEnd: string;
        BadgeList: number[];
        SideGroupList: number[];
    };
}

export interface GetProdKindType {
    StoreIdx: number;
    ModDate: string;
}

export interface GetMenuGroupProdListType {
    StoreIdx: number;
    MenuGroupIdx: number;
    ProdCount: number;
    Prods: {
        Idx: number;
        SortNo: number;
        TypeName: string;
        ProdGroupName: string;
        IsEnabled: number;
        ProdGroupDisplayName: string;
        ProdGroupFontSize: string;
        SalePrice: number;
        IsAutoSoldOut: number;
        ProdCount: number;
        UseViewDate: number;
        ViewDateStart: string;
        ViewDateEnd: string;
        ProdSoldOutState: number;
    }[];
}
export interface SetMenuGroupProdListType {
    StoreIdx: number;
    MenuGroupIdx: number;
    ProdCount: number;
    Prods: {
        Idx: number;
        SortNo: number;
        TypeName: string;
        ProdGroupName: string;
        IsEnabled: number;
        ProdGroupDisplayName: string;
        ProdGroupFontSize: string;
        SalePrice: number;
        IsAutoSoldOut: number;
        ProdCount: number;
        UseViewDate: number;
        ViewDateStart: string;
        ViewDateEnd: string;
        ProdSoldOutState: number;
    }[];
}