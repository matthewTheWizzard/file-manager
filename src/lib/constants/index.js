export const USERNAME_ARG = '--username';

export const FS_COMMANDS = {
    cat: 'cat',
    add: 'add',
    rn: 'rn',
    cp: 'cp',
    mv: 'mv',
    rm: 'rm',
}

export const PATH_COMMANDS = {
    up: 'up',
    cd: 'cd',
    ls: 'ls',
}

export const OS_COMMANDS = {
    os: 'os',
}

export const COMPRESS_COMMANDS = {
    compress: 'compress',
    decompress: 'decompress',
}

export const HASH_COMMANDS = {
    hash: 'hash',
}

export const ALL_COMMANDS = {
    ...FS_COMMANDS,
    ...PATH_COMMANDS,
    ...OS_COMMANDS,
    ...COMPRESS_COMMANDS,
    ...HASH_COMMANDS,
}

export const VALID_COMMANDS = Object.values(ALL_COMMANDS);
