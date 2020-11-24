import Module from "../module";

export default abstract class Task extends Module {

    delay!: number;
    timer!: ReturnType<typeof setTimeout>;

    abstract onLoop(data: any): void;

    setTimer(delay?: number, data?: any): void {
        delay = delay || this.delay;
        this.timer = setTimeout(this.onLoop.bind(this), delay, data);
    }

    shutdown(): Promise<void> {
        if (!this.timer)
            clearTimeout(this.timer);        
        return super.shutdown();
    }

}