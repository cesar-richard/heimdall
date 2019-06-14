class BlockedModel {
  constructor({
    blo_id,
    blo_raison,
    blo_insert,
    blo_removed,
    fun_id,
    usr_firstname,
    usr_lastname,
    login,
    wallet_id,
    wallet_name
  } = {}) {
    this._blo_id = blo_id;
    this._blo_raison = blo_raison;
    this._blo_insert = blo_insert;
    this._blo_removed = blo_removed;
    this._fun_id = fun_id;
    this._usr_firstname = usr_firstname;
    this._usr_lastname = usr_lastname;
    this._login = login;
    this._wallet_id = wallet_id;
    this._wallet_name = wallet_name;
  }

  get blo_id() {
    return this._blo_id;
  }

  set blo_id(blo_id) {
    this._blo_id = blo_id;
  }
  get blo_raison() {
    return this._blo_raison;
  }

  set blo_raison(blo_raison) {
    this._blo_raison = blo_raison;
  }
  get blo_insert() {
    return this._blo_insert;
  }

  set blo_insert(blo_insert) {
    this._blo_insert = blo_insert;
  }
  get blo_removed() {
    return this._blo_removed;
  }

  set blo_removed(blo_removed) {
    this._blo_removed = blo_removed;
  }
  get fun_id() {
    return this._fun_id;
  }

  set fun_id(fun_id) {
    this._fun_id = fun_id;
  }
  get usr_firstname() {
    return this._usr_firstname;
  }

  set usr_firstname(usr_firstname) {
    this._usr_firstname = usr_firstname;
  }
  get usr_lastname() {
    return this._usr_lastname;
  }

  set usr_lastname(usr_lastname) {
    this._usr_lastname = usr_lastname;
  }
  get login() {
    return this._login;
  }

  set login(login) {
    this._login = login;
  }
  get wallet_id() {
    return this._wallet_id;
  }

  set wallet_id(wallet_id) {
    this._wallet_id = wallet_id;
  }
  get wallet_name() {
    return this._wallet_name;
  }

  set wallet_name(wallet_name) {
    this._wallet_name = wallet_name;
  }
}

export default BlockedModel;
