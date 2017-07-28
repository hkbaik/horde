const previousItem = (curr, len) => (curr-1) < 0 ? curr-1+len : curr-1
const nextItem = (curr, len) => (curr+1) > len-1 ? curr+1-len : curr+1

export { previousItem, nextItem }
