export const createNoiseBuffer = (ctx) => {
  const size = ctx.sampleRate,
        buf = ctx.createBuffer(1, size, ctx.sampleRate),
        output = buf.getChannelData(0)
  for (let i = 0; i < size; i++) {
    output[i] = Math.random() * 2 - 1
  }
  return buf
}

export const m2f = (note) => {
  return 440.0 * Math.pow(2.0, (note - 69) / 12)
}
