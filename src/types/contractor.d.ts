import {
    AddrInfo,
    SpecInfo,
    FileInfo,
    Pageable,
    CommonInfo
} from './global';

export interface ContractorPostInfo {
    name: string;
    description: string;
    updatedBy: string;
}

export interface ContractorStatus {
    status: string;
    statusReason: string;
}

export interface ContractorInfo extends CommonInfo, ContractorStatus {
    email: string;
    address?: AddrInfo;
    contractorFiles: Array<FileInfo>;
    contractorSpecialties: Array<SpecInfo>;
}

export interface Contractors extends Pageable {
    content: Array<ContractorInfo>;
}
