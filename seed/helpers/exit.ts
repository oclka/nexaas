export function exit(isError: boolean): never {
  console.log('');

  if (isError) {
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  } else {
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(0);
  }
}
