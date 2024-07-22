import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type TokenTransfer = {
    $$type: 'TokenTransfer';
    queryId: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeTokenTransfer(src: TokenTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransfer(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserTokenTransfer(): DictionaryValue<TokenTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransfer(src.loadRef().beginParse());
        }
    }
}

export type TokenNotification = {
    $$type: 'TokenNotification';
    queryId: bigint;
    amount: bigint;
    from: Address;
    forwardPayload: Cell;
}

export function storeTokenNotification(src: TokenNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadTokenNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _forwardPayload = sc_0.asCell();
    return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forwardPayload: _forwardPayload };
}

function loadTupleTokenNotification(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forwardPayload = source.readCell();
    return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forwardPayload: _forwardPayload };
}

function storeTupleTokenNotification(source: TokenNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeSlice(source.forwardPayload);
    return builder.build();
}

function dictValueParserTokenNotification(): DictionaryValue<TokenNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenNotification(src.loadRef().beginParse());
        }
    }
}

export type TokenExcesses = {
    $$type: 'TokenExcesses';
    queryId: bigint;
}

export function storeTokenExcesses(src: TokenExcesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadTokenExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'TokenExcesses' as const, queryId: _queryId };
}

function loadTupleTokenExcesses(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'TokenExcesses' as const, queryId: _queryId };
}

function storeTupleTokenExcesses(source: TokenExcesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserTokenExcesses(): DictionaryValue<TokenExcesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadTokenExcesses(src.loadRef().beginParse());
        }
    }
}

export type ClaimMRT = {
    $$type: 'ClaimMRT';
    amount: bigint;
    signature: Cell;
    nonce: bigint;
}

export function storeClaimMRT(src: ClaimMRT) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2641488382, 32);
        b_0.storeInt(src.amount, 257);
        b_0.storeRef(src.signature);
        b_0.storeInt(src.nonce, 257);
    };
}

export function loadClaimMRT(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2641488382) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    let _signature = sc_0.loadRef();
    let _nonce = sc_0.loadIntBig(257);
    return { $$type: 'ClaimMRT' as const, amount: _amount, signature: _signature, nonce: _nonce };
}

function loadTupleClaimMRT(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _signature = source.readCell();
    let _nonce = source.readBigNumber();
    return { $$type: 'ClaimMRT' as const, amount: _amount, signature: _signature, nonce: _nonce };
}

function storeTupleClaimMRT(source: ClaimMRT) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeSlice(source.signature);
    builder.writeNumber(source.nonce);
    return builder.build();
}

function dictValueParserClaimMRT(): DictionaryValue<ClaimMRT> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeClaimMRT(src)).endCell());
        },
        parse: (src) => {
            return loadClaimMRT(src.loadRef().beginParse());
        }
    }
}

export type WithdrawJetton = {
    $$type: 'WithdrawJetton';
    amount: bigint;
    jetton: Address;
}

export function storeWithdrawJetton(src: WithdrawJetton) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(368488170, 32);
        b_0.storeInt(src.amount, 257);
        b_0.storeAddress(src.jetton);
    };
}

export function loadWithdrawJetton(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 368488170) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    let _jetton = sc_0.loadAddress();
    return { $$type: 'WithdrawJetton' as const, amount: _amount, jetton: _jetton };
}

function loadTupleWithdrawJetton(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _jetton = source.readAddress();
    return { $$type: 'WithdrawJetton' as const, amount: _amount, jetton: _jetton };
}

function storeTupleWithdrawJetton(source: WithdrawJetton) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.jetton);
    return builder.build();
}

function dictValueParserWithdrawJetton(): DictionaryValue<WithdrawJetton> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdrawJetton(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawJetton(src.loadRef().beginParse());
        }
    }
}

export type ChangeMRT = {
    $$type: 'ChangeMRT';
    newAddress: Address;
}

export function storeChangeMRT(src: ChangeMRT) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1085275151, 32);
        b_0.storeAddress(src.newAddress);
    };
}

export function loadChangeMRT(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1085275151) { throw Error('Invalid prefix'); }
    let _newAddress = sc_0.loadAddress();
    return { $$type: 'ChangeMRT' as const, newAddress: _newAddress };
}

function loadTupleChangeMRT(source: TupleReader) {
    let _newAddress = source.readAddress();
    return { $$type: 'ChangeMRT' as const, newAddress: _newAddress };
}

function storeTupleChangeMRT(source: ChangeMRT) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.newAddress);
    return builder.build();
}

function dictValueParserChangeMRT(): DictionaryValue<ChangeMRT> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeMRT(src)).endCell());
        },
        parse: (src) => {
            return loadChangeMRT(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
    token_wallet_address: Address;
    publicKey: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1993176034, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.token_wallet_address);
        b_0.storeInt(src.publicKey, 257);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1993176034) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _token_wallet_address = sc_0.loadAddress();
    let _publicKey = sc_0.loadIntBig(257);
    return { $$type: 'Deploy' as const, queryId: _queryId, token_wallet_address: _token_wallet_address, publicKey: _publicKey };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _token_wallet_address = source.readAddress();
    let _publicKey = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId, token_wallet_address: _token_wallet_address, publicKey: _publicKey };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.token_wallet_address);
    builder.writeNumber(source.publicKey);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type Claimed = {
    $$type: 'Claimed';
    nonce: bigint;
    player: Address;
    amount: bigint;
}

export function storeClaimed(src: Claimed) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3201486052, 32);
        b_0.storeInt(src.nonce, 257);
        b_0.storeAddress(src.player);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadClaimed(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3201486052) { throw Error('Invalid prefix'); }
    let _nonce = sc_0.loadIntBig(257);
    let _player = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'Claimed' as const, nonce: _nonce, player: _player, amount: _amount };
}

function loadTupleClaimed(source: TupleReader) {
    let _nonce = source.readBigNumber();
    let _player = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'Claimed' as const, nonce: _nonce, player: _player, amount: _amount };
}

function storeTupleClaimed(source: Claimed) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.nonce);
    builder.writeAddress(source.player);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserClaimed(): DictionaryValue<Claimed> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeClaimed(src)).endCell());
        },
        parse: (src) => {
            return loadClaimed(src.loadRef().beginParse());
        }
    }
}

 type ClaimToken_init_args = {
    $$type: 'ClaimToken_init_args';
}

function initClaimToken_init_args(src: ClaimToken_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function ClaimToken_init() {
    const __code = Cell.fromBase64('te6ccgECLAEACCQAART/APSkE/S88sgLAQIBYgIDA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVE9s88uCCFBUWAgEgBAUCASAGBwIBIAoLAhW64f2zxVA9s8bEGBQIAhG4Ud2zzbPGxBgUCQAqgQEBJAJxQTP0DG+hlAHXADCSW23iAAIjAgEgDA0CASAPEAIRttgbZ5tnjYgwFA4A3bd6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHME4ECrgDcAzscpnLB1XI5LZYcE4DepO98qiy3jjqenvAqzhk0E4TsunLVmnZbmdB0s2yjN0UkE4IGc6tPOK/OkoWA6wtxMj2UAAI+CdvEAIBIBESAhG2z3tnm2eNiDAUEwARsK+7UTQ0gABgAHWybuNDVpcGZzOi8vUW1ZODZGVHZIcmRvcWEybmRvRDNFazhLZXBqM0ZYQlpkVk4ydE12R2Z5ZWlQOYIAAMICBu8tCAAfTtRNDUAfhj0gABjmH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfQE0gABlYEBAdcAkm0B4iDXCwHDAI4f+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJRy1yFt4hRDMGwU4DD4KNcLCoMJuvLgiRcD9u2i7fsBkjB/4HAh10nCH5UwINcLH94gghB2zXPiuuMCIMAAItdJwSGwklt/4CCCENUydtu6jhQw0x8BghDVMnbbuvLggdM/ATEwf+AgghCdcen+uo6jMNMfAYIQnXHp/rry4IGBAQHXANQB0AGBAQHXAFUgbBPbPH/gIBkaGwDeyPhDAcx/AcoAVTBQQyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFvQAIm6zmn8BygASgQEBzwCVMnBYygDiASBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiye1UAQTbPBgADm1tbfhCVSAC4jDTHwGCEHbNc+K68uCB0z/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAVSBsExA2RUbbPFuBAQFxfyEhbpVbWfRaMJjIAc8AQTP0QuIDyAGCEK/5D1dYyx/LP8lEQPhCAXBt2zx/JxwDvIIAzfEmgQEBI3FBM/QMb6GUAdcAMJJbbeJu8vT4QlUzVHV02zwiIG7y0IBBgPkQgSVpAfL0AYEBASV/cSFulVtZ9FowmMgBzwBBM/RC4iUgbvLQgPhCcH8o2zwrVSAdHh8EsoIQQK/8D7qPQzDTHwGCEECv/A+68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDFVMNs8MPhCcIBCcFUgbW1t2zxVAn/gIIIQFfau6rrjAsAAJyohIgE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwqAFICyMofWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgH6Asn5AADeyCHBAJiALQHLBwGjAd4hgjgyfLJzQRnTt6mqHbmOIHAgcY4UBHqpDKYwJagSoASqBwKkIcAARTDmMDOqAs8BjitvAHCOESN6qQgSb4wBpAN6qQQgwAAU5jMipQOcUwJvgaYwWMsHAqVZ5DAx4snQA/4jwgCPJIIQBfXhAHD4KG2CCJiWgAVeREEwGMhVYNs8yRA0AUREbW3bPJJfBuJENshVIIIQvtLM5FAEyx8SgQEBzwABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwDJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAJCogAab4QnCAQnBVIG1tbds8i9Q2xhaW0gc3VjY2Vzc4jQsW0RFQlVHXSBGaWxlIGNvbnRyYWN0c1xjbGFpbV90b2tlbi50YWN0OjYxOjmD+FDD+FDBDAyoBcDDTHwGCEBX2ruq68uCBgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEmwS2zx/IwFmjq35AYLwCVGQGUruYRzolcVQOt+F/YZN55BXRhQvYI0+svqtFOS6joXbPH/bMeCRMOJwJgSkVTHbPHB/jQVT3duZXIgV2l0aGRyYXcgSmV0dG9ugJhBYBAlVICPCAI8kghAF9eEAcPgobYIImJaABV5EQTAYyFVg2zzJEDQBRERtbds8kl8G4ickKiUAyIIQD4p+pVAIyx8Wyz9QBPoCWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYhbrOVfwHKAMyUcDLKAOIB+gIBzxYBHvhCcIBCcFUgbW1t2zxAAyoETNs8+CdvEIIQBfXhAKFwiCZVICLCAI6LECOAQgEQJG1t2zySXwTiJygqKQAS+EJSQMcF8uCEACQAAAAAT3duZXIgV2l0aGRyYXcBGvhCcIBCcFUgbW1t2zwqAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7ACsAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMw=');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initClaimToken_init_args({ $$type: 'ClaimToken_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const ClaimToken_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    9577: { message: `Invalid Signature` },
    52721: { message: `Claimed` },
}

const ClaimToken_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TokenTransfer","header":260734629,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenNotification","header":1935855772,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenExcesses","header":3576854235,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ClaimMRT","header":2641488382,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"signature","type":{"kind":"simple","type":"slice","optional":false}},{"name":"nonce","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"WithdrawJetton","header":368488170,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"jetton","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeMRT","header":1085275151,"fields":[{"name":"newAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Deploy","header":1993176034,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"token_wallet_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"publicKey","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"Claimed","header":3201486052,"fields":[{"name":"nonce","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"player","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const ClaimToken_getters: ABIGetter[] = [
    {"name":"balance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getClaimed","arguments":[{"name":"nonce","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"bool","optional":true}},
    {"name":"tokenMRT","arguments":[],"returnType":{"kind":"simple","type":"address","optional":true}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const ClaimToken_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenExcesses"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ClaimMRT"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeMRT"}},
    {"receiver":"internal","message":{"kind":"text","text":"withdraw"}},
    {"receiver":"internal","message":{"kind":"typed","type":"WithdrawJetton"}},
]

export class ClaimToken implements Contract {
    
    static async init() {
        return await ClaimToken_init();
    }
    
    static async fromInit() {
        const init = await ClaimToken_init();
        const address = contractAddress(0, init);
        return new ClaimToken(address, init);
    }
    
    static fromAddress(address: Address) {
        return new ClaimToken(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  ClaimToken_types,
        getters: ClaimToken_getters,
        receivers: ClaimToken_receivers,
        errors: ClaimToken_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: Deploy | null | TokenExcesses | ClaimMRT | ChangeMRT | 'withdraw' | WithdrawJetton) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenExcesses') {
            body = beginCell().store(storeTokenExcesses(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ClaimMRT') {
            body = beginCell().store(storeClaimMRT(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeMRT') {
            body = beginCell().store(storeChangeMRT(message)).endCell();
        }
        if (message === 'withdraw') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawJetton') {
            body = beginCell().store(storeWithdrawJetton(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getBalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('balance', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetClaimed(provider: ContractProvider, nonce: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(nonce);
        let source = (await provider.get('getClaimed', builder.build())).stack;
        let result = source.readBooleanOpt();
        return result;
    }
    
    async getTokenMrt(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('tokenMRT', builder.build())).stack;
        let result = source.readAddressOpt();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}