

export interface AreaData {
    id: number;
    name: string;
    code: string;
    companyId: number;
}

export interface AreasDto {
    status: string;
    data: AreaData[];
}

export interface AreaDto {
    status: string;
    data: AreaData;
}

export interface AreaDeleteDto {
    status: string;
    data: null;
}