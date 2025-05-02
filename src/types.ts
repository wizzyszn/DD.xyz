interface DedupeJson {
    count: number;
    medium: number;
    high: number;
    overallRisk: number;
    issues: Issue[];
  }
  interface ResponseError extends Error {
    message: string;
    error: string;
    statusCode: number;
  }
  
  interface Issue {
    transaction: Transaction;
    score: number;
    tags: Tag[];
    categories: Categories;
    riskScore: string;
  }
  
  interface Transaction {
    transaction_hash: string;
    from_to_address: string;
    direction: string;
    contract_address: string;
    token_id: string;
    token_type: string;
    block_number: number;
    timestamp: number;
    datetime: string;
    is_contract: boolean;
    address_info_risk: AddressInfoRisk;
    token_risk: TokenRisk;
    address_risk_data: AddressRiskData;
    token_risk_data: TokenRiskData;
    contract_risk_data: Record<string, unknown>;
    token_name: string;
  }
  
  interface AddressInfoRisk {
    balance: number;
    expiresAt: number;
    time_1st_tx: string;
    time_verified: number;
    has_no_balance: boolean;
    automated_trading: boolean;
    transaction_count: number;
    has_no_transactions: boolean;
  }
  
  interface TokenRisk {
    expiresAt: number;
    is_trusted: boolean;
    token_name: string;
    token_symbol: string;
    access_control: AccessControl;
    illegal_unicode: boolean;
    contract_address: string;
  }
  
  interface AccessControl {
    interfaceType: string;
    activeRoleHolders: ActiveRoleHolder[];
  }
  
  interface ActiveRoleHolder {
    name: string;
    role: string;
    account: string;
  }
  
  interface AddressRiskData {
    mixer: string;
    reinit: string;
    address: string;
    fake_kyc: string;
    expiresAt: number;
    gas_abuse: string;
    cybercrime: string;
    fake_token: string;
    sanctioned: string;
    data_source: string;
    blacklist_doubt: string;
    financial_crime: string;
    stealing_attack: string;
    money_laundering: string;
    phishing_activities: string;
    blackmail_activities: string;
    darkweb_transactions: string;
    fake_standard_interface: string;
    honeypot_related_address: string;
    malicious_mining_activities: string;
    number_of_malicious_contracts_created: string;
    automated_trading: boolean;
  }
  
  interface TokenRiskData {
    buy_tax: string;
    holders: Holder[];
    is_proxy: string;
    sell_tax: string;
    expiresAt: number;
    is_in_dex: string;
    cannot_buy: string;
    token_name: string;
    is_honeypot: string;
    is_mintable: string;
    hidden_owner: string;
    holder_count: string;
    selfdestruct: string;
    token_symbol: string;
    total_supply: string;
    external_call: string;
    is_anti_whale: string;
    owner_address: string;
    owner_balance: string;
    owner_percent: string;
    is_blacklisted: string;
    is_open_source: string;
    is_whitelisted: string;
    creator_address: string;
    creator_balance: string;
    creator_percent: string;
    trading_cooldown: string;
    transfer_pausable: string;
    slippage_modifiable: string;
    owner_change_balance: string;
    anti_whale_modifiable: string;
    can_take_back_ownership: string;
    honeypot_with_same_creator: string;
    personal_slippage_modifiable: string;
    trust_list: string;
    access_control: boolean;
  }
  
  interface Holder {
    tag: string;
    address: string;
    balance: string;
    percent: string;
    is_locked: number;
    is_contract: number;
  }
  
  interface Tag {
    name: string;
    description: string;
    type: string;
    severity: number;
    key: string;
  }
  
  interface Categories {
    governance_issues: Category;
    fraudulent_malicious: FraudulentMaliciousCategory;
  }
  
  interface Category {
    key: string;
    name: string;
    description: string;
    tags: Record<string, boolean>;
  }
  
  interface FraudulentMaliciousCategory extends Category {
    gradedDescription: {
      high: string;
      medium: string;
      low: string;
    };
  }

  export type {
    ResponseError
  }