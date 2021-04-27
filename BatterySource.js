class BatterySource
{
    constructor()
    {
        this.battStock = 0;
        this.image = loadImage("battery.png");
        this.lastCharged;
    }

    loadBatteryInfo(battStock)
    {
        this.battStock = battStock;
    }

    getChargeTime(lastCharged)
    {
        this.lastCharged = lastCharged;
    }

    detuctCharge()
    {
        if(this.battStock > 1)
        {
            this.battStock = this.battStock -1;
        }
    }

    uploadBattery()
    {
        return this.battStock;
    }

    display()
    {
        var x=80, y=100;
        imageMode(CENTER);
        //image(this.image,720,220, 70,70);

        if(this.battStock != 0)
        {
            for(var i=0; i<this.battStock; i++)
            {
                if(i % 12 == 0)
                {
                    x=80;
                    y=y+30;
                }
                image(this.image,x,y, 50,50);
                x = x+40;
            }
        }
    }
}
