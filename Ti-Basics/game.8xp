:ClrDraw
:0→Xmin:94→Xmax
:0→Ymin:62→Ymax
:2.5→X:2.5→Y:0→A
:4→M
:15→K

:Lbl G
:ClrDraw

:For(I,0,6)
:A-0.5+I*0.16→R
:cos(R)→C
:sin(R)→S
:0→D
:1→W

:While W=1 and D<6
:D+0.2→D
:X+D*C→PX
:Y+D*S→PY
:fPart(PX)→FX
:fPart(PY)→FY
:If PX<1 or PX>M or PY<1 or PY>M
:1→W
:If W=0 and (iPart(PX)=2 and iPart(PY)=2):1→W
:End

:30/D→H
:If H>31:31→H
:13*I→SX

:Line(SX,31-H,SX,31+H)
:Line(SX+12,31-H,SX+12,31+H)
:Line(SX,31-H,SX+12,31-H)
:Line(SX,31+H,SX+12,31+H)
:End

:While K=15
:GetKey→K
:End

:If K=24:A-0.4→A
:If K=26:A+0.4→A
:If K=25
:Then
:X+0.4*cos(A)→NX
:Y+0.4*sin(A)→NY
:If not(NX<1 or NX>M or NY<1 or NY>M)
:Then
:NX→X:NY→Y
:End
:End

:15→K
:Goto G
